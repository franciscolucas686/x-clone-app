from .base import *
import os

DEBUG = False

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

RENDER_EXTERNAL_HOSTNAME = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

CSRF_TRUSTED_ORIGINS = [
    f"https://{host}" for host in ALLOWED_HOSTS if not host.startswith("*")
]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DATABASE_NAME"),
        "USER": env("DATABASE_USER"),
        "PASSWORD": env("DATABASE_PASSWORD"),
        "HOST": env("DATABASE_HOST"),
        "PORT": env("DATABASE_PORT", default="5432"),
    }
}

CORS_ALLOW_ALL_ORIGINS = False

local_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

CORS_ALLOWED_ORIGINS = [f"https://{host}" for host in ALLOWED_HOSTS if not host.startswith("*")]
CORS_ALLOWED_ORIGINS += local_origins