import os
import django
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.production")
django.setup()

from django.core.files import File
from django.contrib.auth import get_user_model
from django.core.files.storage import default_storage

from posts.models import Post
from followers.models import Follow
from posts.models import Like, Comment

User = get_user_model()

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
AVATAR_SEED_DIR = os.path.join(BASE_DIR, "media-seed", "avatars")


def safe_avatar_upload(user: User, avatar_filename: str) -> None:
    """
    Envia avatar para o Cloudinary usando o storage padrão do Django.
    """
    local_path = os.path.join(AVATAR_SEED_DIR, avatar_filename)

    if not os.path.exists(local_path):
        print(f"⚠️ Avatar '{avatar_filename}' não encontrado. Usando default.png")
        local_path = os.path.join(AVATAR_SEED_DIR, "default.png")

        if not os.path.exists(local_path):
            print("❌ default.png não encontrado. Avatar não será atribuído.")
            return

    print(f"⬆️ Enviando avatar para {user.username}...")

    with open(local_path, "rb") as f:
        file_name = f"avatars/{user.username}.png"
        saved_path = default_storage.save(file_name, File(f))

    user.avatar = saved_path
    user.save(update_fields=["avatar"])

    print(f"🖼️ Avatar enviado para {user.username}")


def create_users() -> list[User]:
    print("👥 Criando usuários...")

    users_data = [
        {"username": "franciscolucas", "name": "Francisco Lucas", "password": "123456Hx(", "avatar": "user1.png"},
        {"username": "matheusfidera", "name": "Matheus Fidera", "password": "123456Ts&", "avatar": "user2.png"},
        {"username": "raianeester", "name": "Raiane Ester", "password": "123456Ws!", "avatar": "user3.png"},
        {"username": "solangecarriel", "name": "Solange Carriel", "password": "123456Rd/", "avatar": "user4.png"},
    ]

    created_users: list[User] = []

    for data in users_data:
        user = User.objects.filter(username=data["username"]).first()

        if not user:
            user = User.objects.create_user(
                username=data["username"],
                name=data["name"],
                password=data["password"],
            )
            print(f"✅ Usuário criado: {user.username}")
        else:
            print(f"ℹ️ Usuário {user.username} já existe")

        safe_avatar_upload(user, data["avatar"])
        created_users.append(user)

    print("🌱 Usuários criados com sucesso!")
    return created_users


def create_followers(users: list[User]) -> None:
    print("🔗 Criando followers...")

    for user in users:
        choices = [u for u in users if u != user]
        sample = random.sample(choices, k=random.randint(1, len(choices)))

        for target in sample:
            Follow.objects.get_or_create(follower=user, following=target)

    print("✅ Followers criados!")


def create_posts(users: list[User]) -> list[Post]:
    print("📝 Criando posts...")
    posts: list[Post] = []

    texts = [
        "A persistência é a chave para o sucesso. 🔑",
        "Hora de colocar a playlist para tocar e começar a codar! 🎧💻",
        "Um dia de cada vez, com foco e determinação. ✨",
        "O sol da manhã recarrega as energias. ☀️🔋",
    ]

    for user in users:
        for _ in range(random.randint(1, 3)):
            post = Post.objects.create(
                user=user,
                text=random.choice(texts),
            )
            posts.append(post)
            print(f"🆕 Post criado por {user.username}")

    print("✅ Posts criados!")
    return posts


def create_likes_and_comments(users: list[User], posts: list[Post]):
    print("❤️ Criando likes e comentários...")

    comments = [
        "Muito bom!",
        "Excelente 👏",
        "Adorei 😍",
        "Concordo totalmente!",
        "Boa dica!",
    ]

    for post in posts:
        likers = random.sample(users, k=random.randint(1, len(users)))
        for liker in likers:
            Like.objects.get_or_create(user=liker, post=post)

        commenters = random.sample(users, k=random.randint(1, len(users)))
        for commenter in commenters:
            Comment.objects.create(
                user=commenter,
                post=post,
                text=random.choice(comments),
            )

    print("✅ Likes e comentários criados!")


def run():
    print("🌱 Iniciando seed...")
    users = create_users()
    create_followers(users)
    posts = create_posts(users)
    create_likes_and_comments(users, posts)
    print("🌿 Seed completo!")


if __name__ == "__main__":
    run()
