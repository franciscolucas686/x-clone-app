from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.utils.timesince import timesince
from datetime import datetime

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
    joined_display = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'password', 'confirm_password', 'avatar', 'joined_display']

    def get_joined_display(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y")

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "As senhas não são iguais."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        avatar = validated_data.pop('avatar', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            name=validated_data['name'],
            password=validated_data['password']
        )

        if avatar:
            user.avatar = avatar
            user.save()
        
        return user
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Este nome de usuário já está em uso.")
        return value
    
class UserProfileSerializer(serializers.ModelSerializer):
    joined_display = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'avatar', 'joined_display']

    def get_joined_display(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y")