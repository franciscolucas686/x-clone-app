#!/bin/sh
set -e

echo "🔍 Verificando se o banco de dados está disponível..."

DB_HOST=${DATABASE_HOST:-db}
DB_PORT=${DATABASE_PORT:-5432}

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "⏳ Aguardando o banco de dados em $DB_HOST:$DB_PORT..."
  sleep 2
done

echo "✅ Banco de dados disponível!"

echo "🚀 Aplicando migrações..."
python manage.py migrate --noinput

mkdir -p /app/media

if [ -n "${DJANGO_SUPERUSER_USERNAME:-}" ] && [ -n "${DJANGO_SUPERUSER_PASSWORD:-}" ]; then
  echo "👑 Verificando/Atualizando superusuário..."
  python manage.py shell <<PY
from django.contrib.auth import get_user_model
User = get_user_model()
username = "${DJANGO_SUPERUSER_USERNAME}"
password = "${DJANGO_SUPERUSER_PASSWORD}"
name = "${DJANGO_SUPERUSER_NAME:-Administrator}"

user, created = User.objects.get_or_create(username=username, defaults={'email': email})
if created:
    user.is_superuser = True
    user.is_staff = True
    user.set_password(password)
    user.name = name
    user.email = email
    user.save()
    print("✅ Superusuário criado com sucesso.")
else:
    user.name = name
    if not user.has_usable_password():
        user.set_password(password)
    user.save()
    print("🔄 Superusuário já existia — atualizado name/password se necessário.")
PY
fi

echo "✅ Setup completo. Iniciando server..."

exec "$@"
