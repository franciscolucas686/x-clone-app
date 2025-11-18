import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings.production")

import django
import random

django.setup()

import cloudinary.uploader

from django.contrib.auth import get_user_model
from django.core.files import File
from followers.models import Follow
from posts.models import Post, Like, Comment


User = get_user_model()


def create_users():
    print("👥 Criando usuários...")

    users_data = [
        {"username": "franciscolucas", "name": "Francisco Lucas", "password": "123456Hx(", "avatar": "user1.png"},
        {"username": "matheusfidera", "name": "Matheus Fidera", "password": "123456Ts&", "avatar": "user2.png"},
        {"username": "raianeester", "name": "Raiane Ester", "password": "123456Ws!", "avatar": "user3.png"},
        {"username": "solangecarriel", "name": "Solange Carriel", "password": "123456Rd/", "avatar": "user4.png"},
    ]

    created_users = []

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
            print(f"ℹ️ Usuário {user.username} já existe, pulando criação")

        avatar_filename = data.get("avatar") or "default.png"

        BASE_DIR = os.path.dirname(os.path.abspath(__file__))

        seed_path = os.path.join(BASE_DIR,"media-seed", "avatars", avatar_filename)

        if not os.path.exists(seed_path):
            print(f"⚠️ Avatar '{avatar_filename}' não encontrado em media-seed. Usando default.png")
            seed_path = os.path.join("media-seed", "avatars", "default.png")

        if os.path.exists(seed_path):
            print(f"⬆️ Enviando avatar de {user.username} para o Cloudinary...")

            result = cloudinary.uploader.upload(
                seed_path,
                folder="xclone/avatars",
                public_id=user.username,
                overwrite=True,
                resource_type="image"
            )

            user.avatar = result["secure_url"]
            user.save()

            print(f"🖼️ Avatar hospedado e aplicado para {user.username}")
        else:
            print("❌ Nenhum arquivo de avatar encontrado para enviar!")

        created_users.append(user)

    print("🌱 Usuários criados e avatares enviados ao Cloudinary!")
    return created_users


def create_followers(users):
    if len(users) < 2:
        print("⚠️ Poucos usuários para followers. Pulando.")
        return

    print("🔗 Criando followers...")

    for user in users:
        choices = [u for u in users if u != user]
        sample = random.sample(choices, k=random.randint(1, len(choices)))

        for target in sample:
            Follow.objects.get_or_create(follower=user, following=target)

    print("✅ Followers criados!")


def create_posts(users):
    print("📝 Criando posts...")
    posts = []

    texts = [
        "A persistência é a chave para o sucesso. 🔑",
        "Hora de colocar a playlist para tocar e começar a codar! 🎧💻",
        "Um dia de cada vez, com foco e determinação. ✨",
        "O sol da manhã recarrega as energias. ☀️🔋",
        "Focando em novos projetos e desafios. 💡",
        "A leitura abre portas para novos mundos. 📚🌍",
        "Sextou com S de sucesso nos planos da semana. 🥳🗓️",
        "Aproveitando o momento para respirar fundo e planejar. 🧘‍♀️",
        "Metas claras, ações focadas, resultados garantidos. 🎯",
        "Revisando o código e otimizando o sistema. 🔧",
        "A criatividade está fluindo hoje! 🎨",
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


def create_likes_and_comments(users, posts):
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
    print("🌱 Iniciando seed de dados...")

    users = create_users()
    create_followers(users)
    posts = create_posts(users)
    create_likes_and_comments(users, posts)

    print("🌿 Seed completo com sucesso!")


if __name__ == "__main__":
    run()
