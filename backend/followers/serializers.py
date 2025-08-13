from rest_framework import serializers
from .models import Follow
from accounts.serializers import UserProfileSerializer

class FollowSerializer(serializers.ModelSerializer):
    follower = UserProfileSerializer(read_only=True)
    following = UserProfileSerializer(read_only=True)

    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created_at']
