from rest_framework import serializers
from .models import Follow
from accounts.serializers import UserProfileSerializer

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
    
    def validate(self, attrs):
        request = self.context['request']
        if attrs['following'] == request.user:
            raise serializers.ValidationError("Você não pode seguir a si mesmo.")
        return attrs
