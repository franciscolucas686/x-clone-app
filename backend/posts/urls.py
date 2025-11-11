from django.urls import path
from .views import (
    PostListCreateView,
    LikePostView,
    CommentPostView,
    FollowingPostsView,
)

urlpatterns = [
    path("posts/", PostListCreateView.as_view(), name="post-list-create"), 
    path("posts/following/", FollowingPostsView.as_view(), name="following-posts"),
    path("posts/<int:pk>/like/", LikePostView.as_view(), name="like-post"),
    path("posts/<int:pk>/comment/", CommentPostView.as_view(), name="comment-post"),
]
