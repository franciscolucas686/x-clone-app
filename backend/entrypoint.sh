#!/bin/sh
set -e

echo "🔍 Verificando se o banco de dados está disponível..."

until nc -z db 5432; do
  echo "⏳ Aguardando o banco de dados subir..."
  sleep 5
done

echo "✅ Banco de dados disponível!"

echo "🚀 Aplicando migrações..."
python manage.py migrate --noinput

echo "📂 Verificando diretórios de mídia..."
mkdir -p /app/media /app/media-seed

if [ ! -d "/app/media-seed/avatars" ]; then
  echo "⚠️  Diretório /app/media-seed/avatars não encontrado!"
else
  echo "✅ Diretório /app/media-seed/avatars encontrado."
fi

if [ "$DJANGO_SUPERUSER_USERNAME" ] && [ "$DJANGO_SUPERUSER_PASSWORD" ]; then
  echo "👑 Verificando superusuário..."
  python manage.py shell << END

from django.contrib.auth import get_user_model
'
User = get_user_model()
username = "${DJANGO_SUPERUSER_USERNAME}"
if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(
        username=username,
        password="${DJANGO_SUPERUSER_PASSWORD}"
    )
    print("✅ Superusuário criado com sucesso.")
else:
    print("ℹ️  Superusuário já existe.")
END
fi

echo "🌱 Executando seed_data.py e populando dados..."
python seed_data.py || echo "⚠️ Falha ao executar seed"

echo "✅ Setup completo! Iniciando servidor Django..."
exec "$@"