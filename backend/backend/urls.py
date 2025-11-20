from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from accounts.models import User

def debug_user_avatars(request):
    users = User.objects.all().values("id", "username", "avatar")
    return JsonResponse({"users": list(users)})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("accounts.urls")),
    path("api/posts/", include("posts.urls")),
    path("api/follow/", include("followers.urls")),
    path("debug/avatars/", debug_user_avatars),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
