from rest_framework import serializers
from .models import Post, Like, Comment
from accounts.serializers import UserProfileSerializer

class CommentSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)


    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = [
            'id',
            'user',
            'text', 'created_at',
            'comments',
            'likes_count',
            'comments_count',
            'is_liked',
        ]

    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    def get_is_liked(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return Like.objects.filter(post=obj, user=request.user).exists()
        return False