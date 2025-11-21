from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Post, Like, Comment
from .serializers import PostSerializer, CommentSerializer
from django.db.models import Q

class PostListCreateView(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return (
            Post.objects
            .select_related('user')
            .prefetch_related(
                'likes',                   
                'comments',                
                'comments__user'            
            )
            .order_by('-created_at')        
        )

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    
class FollowingPostsView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        following_users = (
        self.request.user.following.all().values_list("following", flat=True)
        )
        return (
            Post.objects
            .filter(Q(user__id__in=following_users) | Q(user=user))
            .select_related("user")
            .prefetch_related("likes", "comments", "comments__user")
            .order_by("-created_at")
        )

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
    
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LikePostView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        post = Post.objects.get(pk=pk)
        like, created = Like.objects.get_or_create(user=request.user, post=post)
        if not created:
            like.delete()
            message = 'Descurtido'
        else:
            message = 'Curtido'
        
        serializer = PostSerializer(post, context={'request': request})
        return Response({
            'message': message,
            'post': serializer.data
        }, status=status.HTTP_200_OK)

class CommentPostView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        post_id = self.kwargs.get('pk')
        post = Post.objects.get(pk=post_id)
        serializer.save(user=self.request.user, post=post)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context