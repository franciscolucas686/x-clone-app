from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from accounts.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class AuthTests(APITestCase):
    def setUp(self):
        self.register_url = reverse('register')
        self.token_url = reverse('token_obtain_pair')
        self.refresh_url = reverse('token_refresh')
        self.profile_url = reverse('profile')

        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'StrongPassword123',
        }

        self.user = User.objects.create_user(
            username='existinguser',
            email='existing@email.com',
            password='ExistingPassword123'
        )

    def test_user_registration(self):
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='testuser').exists())

    def test_jwt_login_token(self):
        response = self.client.post(self.token_url, {
            'username': 'existinguser',
            'password': 'ExistingPassword123'
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_token_refresh(self):
        refresh = RefreshToken.for_user(self.user)
        response = self.client.post(self.refresh_url, {'refresh': str(refresh)}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)

    def test_profile_acccess_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.profile_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_profile_update_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(self.profile_url, {
            'username': 'updateduser',
            'email': 'newemail@email.com',
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.username, 'updateduser')