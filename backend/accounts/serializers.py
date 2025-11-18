from rest_framework import serializers
from .models import User
from django.contrib.auth.password_validation import validate_password
from django.utils.timesince import timesince
from datetime import datetime

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, validators=[validate_password])
    confirm_password = serializers.CharField(write_only=True)
    avatar = serializers.ImageField(required=False, allow_null=True)
    avatar_url = serializers.SerializerMethodField()
    joined_display = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'password', 'confirm_password', 'avatar', 'avatar_url', 'joined_display']

    def get_joined_display(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y")

    def get_avatar_url(self, obj):
        if not obj.avatar:
            return None
        try:
            return obj.avatar.url
        except Exception:
            return None

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
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)
    avatar = serializers.ImageField(write_only=True, required=False)
    avatar_url = serializers.SerializerMethodField()

    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'name',
            'avatar',
            'avatar_url',
            'joined_display',
            'password',
            'confirm_password',
            'is_following',
            'followers_count',
            'following_count',
        ]

    def get_joined_display(self, obj):
        return obj.date_joined.strftime("%d/%m/%Y")
    
    def get_avatar_url(self, obj):
        if not obj.avatar:
            return None
        try:
            return obj.avatar.url
        except Exception:
            return None

    def get_is_following(self, obj):
        request = self.context.get("request")

        if not request or not request.user.is_authenticated:
            return False
        
        from followers.models import Follow
        return Follow.objects.filter(
            follower=request.user,
            following=obj
        ).exists()

    def get_followers_count(self, obj):
        from followers.models import Follow
        return Follow.objects.filter(following=obj).count()

    def get_following_count(self, obj):
        from followers.models import Follow
        return Follow.objects.filter(follower=obj).count()

    def validate(self, data):
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if password or confirm_password:
            if password != confirm_password:
                raise serializers.ValidationError(
                    {"confirm_password": "As senhas não coincidem."}
                )

        return data

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        validated_data.pop("confirm_password", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password:
            instance.set_password(password)

        instance.save()
        return instance
