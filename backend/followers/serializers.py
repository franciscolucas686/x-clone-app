from rest_framework import serializers
from .models import Follow
from accounts.serializers import UserProfileSerializer
from accounts.models import User

class UserOnlySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "name",
            "avatar_url",
            "joined_display",
            "is_following",
            "followers_count",
            "following_count",
            "posts_count",
        ]


class FollowSerializer(serializers.ModelSerializer):
    follower = UserProfileSerializer(read_only=True)
    following = UserProfileSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created_at']

class FollowCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created_at']
        read_only_fields = ['id', 'follower', 'created_at']