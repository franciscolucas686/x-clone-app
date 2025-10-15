from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from accounts.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.files.uploadedfile import SimpleUploadedFile
import io
from PIL import Image
from datetime import timedelta
from rest_framework_simplejwt.tokens import AccessToken

class AuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.token_url = reverse('token_obtain_pair')
        self.profile_url = reverse('profile')

        self.user_data = {
            'username': 'testuser',
            'name': 'Test User',
            'password': 'StrongPassword123',
            'confirm_password': 'StrongPassword123'
        }

        self.user = User.objects.create_user(
            username='existinguser',
            name='Existing User',
            password='ExistingPassword123'
        )

    def generate_test_image(self):
        file = io.BytesIO()
        image = Image.new('RGB', (100, 100), color='blue')
        image.save(file, format='PNG')
        file.seek(0)
        return SimpleUploadedFile(
            name="test_image.png",
            content=file.read(),
            content_type="image/png"
        )

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_user_registration_with_avatar(self):
        avatar = self.generate_test_image()
        data_with_avatar = {
            'username': 'testuser_with_avatar',
            'name': 'Francisco Lucas',
            'password': 'Avatarassword123',
            'confirm_password': 'Avatarassword123',
            'avatar': avatar
        }
        response = self.client.post(self.register_url, data_with_avatar, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser_with_avatar').exists())
        self.assertIn('avatar', response.data)

    def test_registration_password_mismatch(self):
        data = {
            'username': 'failuser', 
            'name': 'failuser',
            'password': 'UltraSecurePass456!',
            'confirm_password': 'DifferentPass456!'
        }
        response = self.client.post(self.register_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('confirm_password', response.data)

    def test_jwt_login_token(self):
        response = self.client.post(self.token_url, {
            'username': 'existinguser',
            'password': 'ExistingPassword123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_profile_acccess_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_profile_update_authenticated(self):
        self.client.force_authenticate(user=self.user)
        new_avatar = self.generate_test_image()
        response = self.client.patch(self.profile_url, {
            'username': '@updateduser',
            'name': 'New Name',
            'avatar': new_avatar
        }, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, '@updateduser')
        self.assertTrue(bool(self.user.avatar))
        self.assertIn('avatar', response.data)

    def test_token_expired(self):
        expired_token = AccessToken.for_user(self.user)
        expired_token.set_exp(lifetime=timedelta(seconds=-1))

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {str(expired_token)}')

        response = self.client.get(self.profile_url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn('detail', response.data)
        self.assertEqual(response.data['detail'].code, 'token_not_valid')