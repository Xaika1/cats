
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_seed_cats'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='catdb',
            options={'ordering': ['cat_name', 'id']},
        ),
        migrations.AddField(
            model_name='catdb',
            name='age',
            field=models.PositiveSmallIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='catdb',
            name='breed',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AddField(
            model_name='catdb',
            name='gender',
            field=models.CharField(choices=[('male', 'Кот'), ('female', 'Кошка')], default='male', max_length=10),
        ),
        migrations.AlterField(
            model_name='catdb',
            name='cat_information',
            field=models.CharField(blank=True, default='cat_information', max_length=500),
        ),
    ]
