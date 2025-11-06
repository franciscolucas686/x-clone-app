from rest_framework import generics, permissions, parsers
from .models import User
from .serializers import RegisterSerializer, UserProfileSerializer
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

    def patch(self, request, *args, **kwargs):
        """
        Permite atualização parcial de perfil (incluindo senha e avatar).
        """
        return self.partial_update(request, *args, **kwargs)
