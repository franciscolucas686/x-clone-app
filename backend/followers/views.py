from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .models import Follow
from accounts.serializers import UserProfileSerializer

User = get_user_model()
class FollowToggleView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, user_id):
        try:
            target_user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return Response({'detail': 'Usuário não encontrado.'}, status=status.HTTP_404_NOT_FOUND)

        if request.user == target_user:
            return Response({'detail':'Você não pode seguir a si mesmo.'}, status=status.HTTP_400_BAD_REQUEST)

        follow, created = Follow.objects.get_or_create(follower=request.user, following=target_user)
        if not created:
            follow.delete()
            return Response({'message': 'Você deixou de seguir.', 'is_following': False}, status=status.HTTP_200_OK)

        return Response({'message': 'Você começou a seguir.', 'is_following': True}, status=status.HTTP_201_CREATED)

class FollowersListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return (
            Follow.objects.filter(following_id=user_id)
            .select_related("follower", "following")
            .distinct()
        )

class FollowingListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        user_id = self.kwargs.get("user_id")
        return (
            Follow.objects.filter(follower_id=user_id)
            .select_related("follower", "following")
            .distinct()
        )
