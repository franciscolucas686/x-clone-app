from django.urls import path
from .views import RegisterView, ProfileView, UserListView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('/users/', UserListView.as_view(), name='user-list'),
]
