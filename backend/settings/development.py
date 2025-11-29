from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": env("DATABASE_NAME", default="postgres"),
        "USER": env("DATABASE_USER", default="postgres"),
        "PASSWORD": env("DATABASE_PASSWORD", default="postgres"),
        "HOST": env("DATABASE_HOST", default="db"),
        "PORT": env("DATABASE_PORT", default="5432"),
    }
}

CORS_ALLOW_ALL_ORIGINS = True
