
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_seed_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='catdb',
            name='photo_credit',
            field=models.CharField(blank=True, default='', max_length=300),
        ),
    ]
