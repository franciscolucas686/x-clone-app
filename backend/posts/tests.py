
from rest_framework import status
from rest_framework.test import APITestCase, APIClient
from django.urls import reverse
from posts.models import Post, Like, Comment
from accounts.models import User

class PostLikeCommentTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='StrongPassword123')
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.post = Post.objects.create(user=self.user, text='Post de teste')
        self.post_list_url = reverse('post-list-create')

    def test_criar_post(self):
        data = {'text': 'Novo post via teste'}
        response = self.client.post(self.post_list_url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Post.objects.count(), 2)
        self.assertEqual(Post.objects.latest('created_at').text, 'Novo post via teste')

    def test_like_post(self):
        like_url = reverse('like-post', kwargs={'pk': self.post.pk})

        response = self.client.post(like_url)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.post.likes.count(), 1)

    def test_comentar_post(self):
        commnet_url = reverse('comment-post', kwargs={'pk': self.post.pk})
        data = {'text': 'Comentário de teste'}

        response = self.client.post(commnet_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.post.comments.count(), 1)
        self.assertEqual(self.post.comments.first().text, 'Comentário de teste')