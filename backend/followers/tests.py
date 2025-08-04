from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from accounts.models import User
from followers.models import Follow 
from rest_framework_simplejwt.tokens import RefreshToken

class FollowTests(APITestCase):
    def setUp(self):
        self.user1 = User.objects.create_user(username='user1', password='StrongPassword123')
        self.user2 = User.objects.create_user(username='user2', password='StrongPassword123')


        refresh = RefreshToken.for_user(self.user1)
        self.access_token = str(refresh.access_token)

        self.follow_url = reverse('follow-toggle', kwargs={'user_id': self.user2.id})
        self.followers_list_url = reverse('followers-list', kwargs={'user_id': self.user2.id})
        self.following_list_url = reverse('following-list', kwargs={'user_id': self.user1.id})

    def authenticate(self):
        self.client.credentials(HTTP_AUTHORIZATION=F'Bearer {self.access_token}')

    def test_follow_user(self):
        self.authenticate()
        response = self.client.post(self.follow_url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Follow.objects.filter(follower=self.user1, following=self.user2).exists())

    def test_unfollow_user(self):
        Follow.objects.create(follower=self.user1, following=self.user2)
        self.authenticate()
        response = self.client.post(self.follow_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Follow.objects.filter(follower=self.user1, following=self.user2).exists())

    def test_follow_self(self):
        self.authenticate()
        url = reverse('follow-toggle', kwargs={'user_id': self.user1.id})
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_followers_list(self):
        Follow.objects.create(follower=self.user1, following=self.user2)
        response = self.client.get(self.followers_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['following']['username'], 'user2')