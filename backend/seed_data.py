import os
import django
import random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from django.contrib.auth import get_user_model
from django.core.files import File
from followers.models import Follow
from posts.models import Post, Like, Comment

User = get_user_model()

def create_users():
    if User.objects.exists():
        print("👥 Usuários já existem. Pulando criação...")
        return list(User.objects.all())

    users_data = [
        {"username": "franciscolucas", "name": "Francisco Lucas", "password": "123456Hx(", "avatar": "user1.png"},
        {"username": "matheusfidera", "name": "Matheus Fidera", "password": "123456Ts&", "avatar": "user2.png"},
        {"username": "raianeester", "name": "Raiane Ester", "password": "123456Ws!", "avatar": "user3.png"},
        {"username": "solangecarriel", "name": "Solange Carriel", "password": "123456Rd/", "avatar": "user4.png"},
    ]

    created_users = []

    for data in users_data:
        user = User.objects.create_user(
            username=data["username"],
            name=data["name"],
            password=data["password"],
        )

        avatar_path = os.path.join("media","avatars", data["avatar"])
        if os.path.exists(avatar_path):
            with open(avatar_path, "rb") as img_file:
                user.avatar.save(data["avatar"], File(img_file), save=True)
            print(f"🖼️ Avatar adicionado para {user.username}")
        else:
            print(f"⚠️ Avatar não encontrado: {avatar_path}")

        created_users.append(user)

    print("✅ Usuários criados com sucesso!")
    return created_users


def create_followers(users):
    if len(users) < 2:
        print("⚠️  Poucos usuários para criar seguidores. Pulando etapa de followers.")
        return

    for user in users:
        following_choices = [u for u in users if u != user]
        if not following_choices:
            continue
        following_sample = random.sample(
            following_choices, 
            k=random.randint(1, len(following_choices))
        )
        for target in following_sample:
            Follow.objects.get_or_create(follower=user, following=target)

    print("✅ Relações de seguidores criadas com sucesso!")


def create_posts(users):
    print("📝 Criando posts...")
    posts = []
    post_texts = [
        "Lindo dia hoje para fazer um bom trabalho! 🚀",
        "Hoje o café saiu mais forte que o código ☕",
        "O amor move montanhas = ❤️",
        "Aprendendo sobre como eu posso melhorar meu ingles.",
        "Curtindo o dia fazendo uma caminhada no parque 🌞",
    ]

    for user in users:
        for _ in range(random.randint(1, 3)):
            post = Post.objects.create(
                user=user,
                text=random.choice(post_texts)
            )
            posts.append(post)
            print(f"🆕 Post criado por {user.username}: {post.text}")

    print("✅ Posts criados com sucesso!")
    return posts


def create_likes_and_comments(users, posts):
    print("❤️ Criando curtidas e comentários...")
    comment_texts = [
        "Muito bom!",
        "Excelente 👏",
        "Adorei esse post 😍",
        "Concordo totalmente!",
        "Boa dica!",
    ]

    for post in posts:
        likers = random.sample(users, k=random.randint(1, len(users)))
        for liker in likers:
            Like.objects.get_or_create(user=liker, post=post)
            print(f"{liker.username} curtiu o post de {post.user.username}")

        commenters = random.sample(users, k=random.randint(1, len(users)))
        for commenter in commenters:
            Comment.objects.create(
                user=commenter,
                post=post,
                text=random.choice(comment_texts)
            )
            print(f"{commenter.username} comentou no post de {post.user.username}")

    print("✅ Curtidas e comentários criados!")


def run():
    print("🌱 Iniciando seed de dados...")

    users = create_users()
    create_followers(users)
    posts = create_posts(users)
    create_likes_and_comments(users, posts)

    print("🌿 Seed completo com sucesso!")


if __name__ == "__main__":
    run()
