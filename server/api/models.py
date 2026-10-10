from django.db import models
from django.contrib.auth.models import User


class profiles(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50, default='user')


class catdb(models.Model):
    GENDER_CHOICES = (
        ('male', 'Кот'),
        ('female', 'Кошка'),
    )

    cat_name = models.CharField(max_length=50, default='cat_name')
    cat_information = models.CharField(max_length=500, default='cat_information', blank=True)
    cat_url = models.ImageField(upload_to='images/', null=True, blank=True)
    breed = models.CharField(max_length=100, blank=True, default='')
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='male')
    age = models.PositiveSmallIntegerField(null=True, blank=True)
    photo_credit = models.CharField(max_length=300, blank=True, default='')

    class Meta:
        ordering = ['cat_name', 'id']

    def __str__(self):
        return self.cat_name


class cathealth(models.Model):
    STATUS_CHOICES = (
        ('healthy', 'Здоров'),
        ('observation', 'Наблюдение'),
        ('sick', 'Болен'),
    )

    cat = models.ForeignKey(catdb, on_delete=models.CASCADE, related_name='health')
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='healthy')
    weight = models.FloatField(null=True, blank=True)
    note = models.CharField(max_length=500, blank=True, default='')

    class Meta:
        ordering = ['-date', '-id']

    def __str__(self):
        return f'{self.cat.cat_name} — {self.date}'
