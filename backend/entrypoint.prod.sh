#!/bin/sh
set -e

echo "🔍 Verificando se o banco de dados está disponível..."

DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}

echo "Usando host: $DB_HOST"
echo "Usando porta: $DB_PORT"

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "⏳ Aguardando o banco de dados em $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "✅ Banco de dados disponível!"

echo "🚀 Aplicando migrações..."
python manage.py migrate --noinput

echo "📂 Verificando diretórios de mídia..."
mkdir -p /app/media

if [ ! -d "/app/media-seed/avatars" ]; then
  echo "⚠️  Diretório /app/media-seed/avatars não encontrado!"
else
  echo "✅ Diretório /app/media-seed/avatars encontrado."
fi

if [ -n "${DJANGO_SUPERUSER_USERNAME:-}" ] && [ -n "${DJANGO_SUPERUSER_PASSWORD:-}" ]; then
  echo "👑 Verificando/Atualizando superusuário..."
  python manage.py shell <<'PY'
from django.contrib.auth import get_user_model
User = get_user_model()
username = "${DJANGO_SUPERUSER_USERNAME}"
password = "${DJANGO_SUPERUSER_PASSWORD}"
name = "${DJANGO_SUPERUSER_NAME:-Administrator}"

user, created = User.objects.get_or_create(username=username)
if created:
    user.is_superuser = True
    user.is_staff = True
    user.set_password(password)
    user.name = name
    user.save()
    print("✅ Superusuário criado com sucesso.")
else:
    updated = False

    if user.first_name != name:
        user.first_name = name
        updated = True

    if not user.check_password(password):
        # Se quiser SEMPRE atualizar a senha:
        user.set_password(password)
        updated = True

    if updated:
        user.save()
        print("🔄 Superusuário existente — atualizado.")
    else:
        print("ℹ️ Superusuário já existe e está atualizado.")
PY
fi

echo "🌱 Executando seed_data.py e populando dados..."
python seed_data.py || echo "⚠️ Falha ao executar seed"

echo "✅ Setup completo. Iniciando server..."

exec "$@"
