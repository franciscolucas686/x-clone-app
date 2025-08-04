from django.urls import path
from .views import FollowToggleView, FollowersListView, FollowingListView

urlpatterns = [
    path('<int:user_id>/', FollowToggleView.as_view(), name='follow-toggle'),
    path('<int:user_id>/followers/', FollowersListView.as_view(), name='followers-list'),
    path('<int:user_id>/following/', FollowingListView.as_view(), name='following-list'),
]