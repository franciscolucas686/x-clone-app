from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=150, blank=True, null=True)
    avatar = models.ImageField(null=True, blank=True)


    def __str__(self):
        return self.username