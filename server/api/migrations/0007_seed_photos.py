import shutil
from pathlib import Path

from django.conf import settings
from django.db import migrations

SOURCE = Path(__file__).resolve().parent.parent / 'seed_photos'

PHOTOS = {
    'Барсик': ('barsik', 'LauraDelga', 'CC BY 4.0', 'File:Orange_Tabby_Cat_sitting_on_a_couch.jpg'),
    'Мурка': ('murka', 'Heikki Siltala', 'CC BY-SA 3.0', 'File:European_shorthair_TUROK_cat_show_Turku_2010-03-27.JPG'),
    'Персик': ('persik', 'Payman sazesh', 'CC BY-SA 4.0', 'File:Persian_Cat_01.jpg'),
    'Луна': ('luna', 'Bombaycats', 'CC BY-SA 3.0', 'File:Bombay_Katze_of_Blue_Sinfonie_1_(2010_photo;_cropped_2022).JPG'),
    'Снежок': ('snezhok', 'Ankarakediler', 'CC BY 3.0', 'File:Turkish_Angora_in_Ankara_Zoo_(AOÇ).JPG'),
    'Соня': ('sonya', 'Sev6nWiki', 'CC BY-SA 4.0', 'File:Gray_British_Shorthair_with_closed_eyes_in_Dubai.jpg'),
    'Граф': ('graf', 'ales brad', 'CC BY-SA 4.0', 'File:Maine_Coon_Cat_List_Characteristics.jpg'),
    'Тигра': ('tigra', 'William Crochot', 'CC BY-SA 4.0', 'File:Bengal_-_19.jpg'),
    'Сима': ('sima', 'Felinlove', 'CC BY-SA 4.0', 'File:Siamese_cat,_modern-style.jpg'),
    'Филя': ('filya', 'Peter Perepelkin', 'CC BY-SA 3.0', 'File:Scottish_Fold_cat_(blue).jpg'),
}

NEW_CATS = [
    {
        'cat_name': 'Граф',
        'cat_information': 'Огромный мейн-кун с кисточками на ушах, важно обходит все столики.',
        'breed': 'Мейн-кун',
        'gender': 'male',
        'age': 5,
        'health': [
            {'date': '2026-09-20', 'status': 'healthy', 'weight': 8.4, 'note': 'Плановый осмотр'},
            {'date': '2026-10-04', 'status': 'healthy', 'weight': 8.6, 'note': 'Вычесали подшёрсток'},
        ],
    },
    {
        'cat_name': 'Тигра',
        'cat_information': 'Пятнистая бенгалка, самая активная в кафе, обожает играть с перьями.',
        'breed': 'Бенгальская',
        'gender': 'female',
        'age': 2,
        'health': [
            {'date': '2026-10-03', 'status': 'observation', 'weight': 3.9, 'note': 'Царапина на лапе, обработали'},
            {'date': '2026-10-08', 'status': 'healthy', 'weight': 4.0, 'note': 'Царапина зажила'},
        ],
    },
    {
        'cat_name': 'Сима',
        'cat_information': 'Голубоглазая сиамская кошка, разговорчивая и очень общительная.',
        'breed': 'Сиамская',
        'gender': 'female',
        'age': 4,
        'health': [
            {'date': '2026-10-06', 'status': 'sick', 'weight': 3.1, 'note': 'Расстройство желудка, диета'},
        ],
    },
    {
        'cat_name': 'Филя',
        'cat_information': 'Вислоухий кот с круглыми глазами, любит сидеть «сусликом».',
        'breed': 'Шотландская вислоухая',
        'gender': 'male',
        'age': 3,
        'health': [],
    },
]


def seed(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    cathealth = apps.get_model('api', 'cathealth')

    for item in NEW_CATS:
        cat, created = catdb.objects.get_or_create(
            cat_name=item['cat_name'],
            defaults={
                'cat_information': item['cat_information'],
                'breed': item['breed'],
                'gender': item['gender'],
                'age': item['age'],
            },
        )
        if created:
            for record in item['health']:
                cathealth.objects.create(cat=cat, **record)

    catdb.objects.filter(cat_name='Соня', cat_information__startswith='Трёхцветная').update(
        cat_information='Голубая британка, может проспать весь день у камина.',
    )

    media = Path(settings.MEDIA_ROOT)
    (media / 'images').mkdir(parents=True, exist_ok=True)
    for name, (key, author, license_name, page) in PHOTOS.items():
        cat = catdb.objects.filter(cat_name=name).first()
        if not cat:
            continue
        current = cat.cat_url.name if cat.cat_url else ''
        if current and not current.startswith('images/seed_'):
            continue
        if current and (media / current).exists():
            (media / current).unlink()
        target = f'images/{key}.jpg'
        shutil.copyfile(SOURCE / f'{key}.jpg', media / target)
        cat.cat_url = target
        cat.photo_credit = f'{author}, {license_name}, Wikimedia Commons: https://commons.wikimedia.org/wiki/{page}'
        cat.save()


def drop(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    catdb.objects.filter(cat_name__in=[c['cat_name'] for c in NEW_CATS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_photo_credit'),
    ]

    operations = [
        migrations.RunPython(seed, drop),
    ]
