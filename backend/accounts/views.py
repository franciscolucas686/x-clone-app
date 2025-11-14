from rest_framework import generics, permissions, parsers
from .models import User
from .serializers import RegisterSerializer, UserProfileSerializer
from django.db.models import Exists, OuterRef
from followers.models import Follow

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    parser_classes = [parsers.JSONParser, parsers.MultiPartParser, parsers.FormParser]

    def get_object(self):
        return self.request.user
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


    def patch(self, request, *args, **kwargs):
        
        return self.partial_update(request, *args, **kwargs)

class UserListView(generics.ListAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        return (
            User.objects
            .exclude(id=user.id)
            .exclude(is_superuser=True)          
            .exclude(is_staff=True)       
            .annotate(
                is_following=Exists(
                    Follow.objects.filter(follower=user, following=OuterRef('id'))
                )
            )
        )
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context
