
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='catdb',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cat_name', models.CharField(default='cat_name', max_length=50)),
                ('cat_information', models.CharField(default='cat_information', max_length=500)),
                ('cat_url', models.ImageField(blank=True, null=True, upload_to='images/')),
            ],
        ),
        migrations.CreateModel(
            name='cathealth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('status', models.CharField(choices=[('healthy', 'Здоров'), ('observation', 'Наблюдение'), ('sick', 'Болен')], default='healthy', max_length=20)),
                ('weight', models.FloatField(blank=True, null=True)),
                ('note', models.CharField(blank=True, default='', max_length=500)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='health', to='api.catdb')),
            ],
            options={
                'ordering': ['-date', '-id'],
            },
        ),
    ]
