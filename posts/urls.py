from django.urls import path
from .views import (
    PostListCreateView,
    LikePostView,
    CommentPostView,
    FollowingPostsView,
    UserPostsView,
)

urlpatterns = [
    path("", PostListCreateView.as_view(), name="post-list-create"), 
    path("following/", FollowingPostsView.as_view(), name="following-posts"),
    path("<int:pk>/like/", LikePostView.as_view(), name="like-post"),
    path("<int:pk>/comment/", CommentPostView.as_view(), name="comment-post"),
    path("user/<str:username>/posts/", UserPostsView.as_view(), name="user-posts"),
]
