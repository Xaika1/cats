import importlib
import io
import shutil
import tempfile

from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import override_settings
from PIL import Image
from rest_framework.test import APITestCase

from .models import catdb, cathealth

MEDIA = tempfile.mkdtemp()


def png(name='cat.png'):
    buffer = io.BytesIO()
    Image.new('RGB', (10, 10), (217, 119, 87)).save(buffer, 'PNG')
    return SimpleUploadedFile(name, buffer.getvalue(), content_type='image/png')


@override_settings(MEDIA_ROOT=MEDIA)
class ApiTests(APITestCase):
    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()
        shutil.rmtree(MEDIA, ignore_errors=True)

    def setUp(self):
        catdb.objects.all().delete()
        self.user = User.objects.create_user('staff', password='Murr12345!')
        self.client.force_authenticate(self.user)

    def make_cat(self, name, **extra):
        return catdb.objects.create(cat_name=name, cat_information='', **extra)

    def test_register_and_login(self):
        self.client.force_authenticate(None)
        response = self.client.post('/api/register/', {
            'username': 'newbie', 'password': 'Murr12345!', 'password2': 'Murr12345!',
            'email': 'a@b.ru', 'role': 'admin',
        }, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertFalse(User.objects.get(username='newbie').is_superuser)
        response = self.client.post('/api/login/', {'username': 'newbie', 'password': 'Murr12345!'}, format='json')
        self.assertIn('access', response.data)

    def test_register_without_email_and_mismatch(self):
        self.client.force_authenticate(None)
        response = self.client.post('/api/register/', {
            'username': 'x1', 'password': 'Murr12345!', 'password2': 'Other12345!',
        }, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('password2', response.data)

    def test_cats_require_auth(self):
        self.client.force_authenticate(None)
        self.assertEqual(self.client.get('/api/cats/').status_code, 401)

    def test_cat_crud_with_photo(self):
        response = self.client.post('/api/cats/', {
            'cat_name': 'Пушок', 'breed': 'Сиамская', 'gender': 'male', 'age': 2, 'cat_url': png(),
        }, format='multipart')
        self.assertEqual(response.status_code, 201)
        cat_id = response.data['id']
        self.assertTrue(response.data['photo'].startswith('http://testserver/media/images/'))

        response = self.client.put(f'/api/cats/{cat_id}/', {'cat_name': 'Пух', 'remove_photo': True}, format='multipart')
        self.assertEqual(response.data['cat_name'], 'Пух')
        self.assertEqual(response.data['photo'], '')
        self.assertEqual(response.data['photo_credit'], '')

        self.assertEqual(self.client.delete(f'/api/cats/{cat_id}/').status_code, 204)
        self.assertFalse(catdb.objects.filter(pk=cat_id).exists())

    def test_cat_validation(self):
        response = self.client.post('/api/cats/', {'cat_name': '  '}, format='json')
        self.assertEqual(response.status_code, 400)
        response = self.client.post('/api/cats/', {'cat_name': 'Кот', 'cat_url': SimpleUploadedFile('a.png', b'no')}, format='multipart')
        self.assertEqual(response.status_code, 400)

    def test_search_and_filters(self):
        barsik = self.make_cat('Барсик', breed='Сиамская', gender='male', age=3)
        murka = self.make_cat('Мурка', breed='Британская', gender='female', age=5)
        self.make_cat('Тихон', gender='male')
        cathealth.objects.create(cat=barsik, date='2026-10-01', status='sick')
        cathealth.objects.create(cat=barsik, date='2026-10-05', status='healthy')
        cathealth.objects.create(cat=murka, date='2026-10-02', status='sick')

        names = lambda q: [c['cat_name'] for c in self.client.get('/api/cats/', q).data]
        self.assertEqual(names({'name': 'мур'}), ['Мурка'])
        self.assertEqual(names({'name': 'сиам'}), ['Барсик'])
        self.assertEqual(names({'status': 'sick'}), ['Мурка'])
        self.assertEqual(names({'status': 'none'}), ['Тихон'])
        self.assertEqual(names({'gender': 'female'}), ['Мурка'])
        self.assertEqual(names({'breed': 'британская'}), ['Мурка'])
        self.assertEqual(names({'sort': '-age'}), ['Мурка', 'Барсик', 'Тихон'])
        self.assertEqual(self.client.get('/api/cats/breeds/').data, ['Британская', 'Сиамская'])
        stats = self.client.get('/api/cats/stats/').data
        self.assertEqual((stats['total'], stats['sick'], stats['healthy'], stats['none']), (3, 1, 1, 1))

    def test_health_crud_and_filters(self):
        cat = self.make_cat('Барсик')
        url = f'/api/cats/{cat.id}/health/'
        response = self.client.post(url, {'date': '2026-10-01', 'status': 'sick', 'weight': 4.2, 'note': 'Чихает'}, format='json')
        self.assertEqual(response.status_code, 201)
        record_id = response.data['id']
        self.client.post(url, {'date': '2026-10-08', 'status': 'healthy'}, format='json')

        self.assertEqual(len(self.client.get(url, {'status': 'sick'}).data), 1)
        self.assertEqual(len(self.client.get(url, {'date_from': '2026-10-05'}).data), 1)
        self.assertEqual(self.client.get(f'/api/cats/{cat.id}/').data['last_status'], 'healthy')

        response = self.client.put(f'/api/health/{record_id}/', {'note': 'Выздоровел'}, format='json')
        self.assertEqual(response.data['note'], 'Выздоровел')
        self.assertEqual(self.client.post(url, {'date': '2026-10-09', 'weight': 99}, format='json').status_code, 400)
        self.assertEqual(self.client.delete(f'/api/health/{record_id}/').status_code, 204)

    def test_profile_and_logout(self):
        self.assertEqual(self.client.get('/api/profile/').data['username'], 'staff')
        response = self.client.put('/api/profile/', {'first_name': 'Аня'}, format='json')
        self.assertEqual(response.data['first_name'], 'Аня')
        self.assertEqual(self.client.get(f'/api/profile-info/{self.user.id}/').data['username'], 'staff')
        login = self.client.post('/api/login/', {'username': 'staff', 'password': 'Murr12345!'}, format='json').data
        self.assertEqual(self.client.post('/api/logout/', {'refresh_token': login['refresh']}, format='json').status_code, 205)
        self.assertEqual(self.client.post('/api/token/refresh/', {'refresh': login['refresh']}, format='json').status_code, 401)

    def test_cors_preflight(self):
        response = self.client.options('/api/cats/', HTTP_ORIGIN='null', HTTP_ACCESS_CONTROL_REQUEST_METHOD='POST')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(response['Access-Control-Allow-Origin'], '*')

    def test_seed_photos_exist(self):
        seed = importlib.import_module('api.migrations.0007_seed_photos')
        self.assertEqual(len(seed.PHOTOS), 10)
        for key, *_ in seed.PHOTOS.values():
            self.assertTrue((seed.SOURCE / f'{key}.jpg').exists())
