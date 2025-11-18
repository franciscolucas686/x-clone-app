# seed_data.py
import os
import django
import random
import cloudinary.uploader
from django.core.files import File
from django.contrib.auth import get_user_model

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.production")
django.setup()

from followers.models import Follow
from posts.models import Post, Like, Comment

User = get_user_model()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AVATAR_SEED_DIR = os.path.join(BASE_DIR, "media-seed", "avatars")


def upload_avatar_to_cloudinary(local_path: str, public_id: str) -> str | None:
    try:
        res = cloudinary.uploader.upload(
            local_path,
            folder="xclone/avatars",
            public_id=public_id,
            overwrite=True,
            resource_type="image",
        )
        return res.get("secure_url")
    except Exception as e:
        print(f"❌ Cloudinary upload failed for {local_path}: {e}")
        return None


def create_users() -> list[User]:
    print("👥 Criando usuários...")

    users_data = [
        {"username": "franciscolucas", "name": "Francisco Lucas", "password": "123456Hx(", "avatar": "user1.png"},
        {"username": "matheusfidera", "name": "Matheus Fidera", "password": "123456Ts&", "avatar": "user2.png"},
        {"username": "raianeester", "name": "Raiane Ester", "password": "123456Ws!", "avatar": "user3.png"},
        {"username": "solangecarriel", "name": "Solange Carriel", "password": "123456Rd/", "avatar": "user4.png"},
    ]

    created = []
    for data in users_data:
        username = data["username"]
        user = User.objects.filter(username=username).first()
        if not user:
            user = User.objects.create_user(
                username=username,
                name=data["name"],
                password=data["password"],
            )
            print(f"✅ Usuário criado: {username}")
        else:
            print(f"ℹ️ Usuário já existe: {username}")

        avatar_filename = data.get("avatar", "default.png")
        local_path = os.path.join(AVATAR_SEED_DIR, avatar_filename)
        if not os.path.exists(local_path):
            print(f"⚠️ {local_path} não encontrado — usando default.png")
            local_path = os.path.join(AVATAR_SEED_DIR, "default.png")

        if os.path.exists(local_path):
            print(f"⬆️ Uploading avatar for {username} -> Cloudinary")
            secure_url = upload_avatar_to_cloudinary(local_path, public_id=username)
            if secure_url:

                user.avatar = secure_url
                user.save(update_fields=["avatar"])
                print(f"🖼️ Avatar atualizado para {username}: {secure_url}")
            else:
                print(f"❌ Falha no upload do avatar para {username}")
        else:
            print(f"❌ Nenhum arquivo local de avatar encontrado para {username}")

        created.append(user)
    return created


def create_followers(users):
    if len(users) < 2:
        return
    print("🔗 Criando followers...")
    for user in users:
        choices = [u for u in users if u != user]
        sample = random.sample(choices, k=random.randint(1, len(choices)))
        for t in sample:
            Follow.objects.get_or_create(follower=user, following=t)
    print("✅ Followers criados!")


def create_posts(users):
    print("📝 Criando posts...")
    texts = [
        "A persistência é a chave para o sucesso. 🔑",
        "Hora de colocar a playlist para tocar e começar a codar! 🎧💻",
        "Um dia de cada vez, com foco e determinação. ✨",
    ]
    posts = []
    for user in users:
        for _ in range(random.randint(1, 3)):
            posts.append(Post.objects.create(user=user, text=random.choice(texts)))
    print("✅ Posts criados!")
    return posts


def create_likes_and_comments(users, posts):
    print("❤️ Criando likes e comentários...")
    comments = ["Muito bom!", "Excelente 👏", "Adorei 😍"]
    for post in posts:
        likers = random.sample(users, k=random.randint(1, len(users)))
        for liker in likers:
            Like.objects.get_or_create(user=liker, post=post)
        commenters = random.sample(users, k=random.randint(1, len(users)))
        for commenter in commenters:
            Comment.objects.create(user=commenter, post=post, text=random.choice(comments))
    print("✅ Likes e comentários criados!")


def run():
    print("🌱 Running seed...")
    users = create_users()
    create_followers(users)
    posts = create_posts(users)
    create_likes_and_comments(users, posts)
    print("🌿 Seed finished.")


if __name__ == "__main__":
    run()
