from django.db import migrations

CATS = [
    {
        'cat_name': 'Барсик',
        'cat_information': 'Рыжий домашний кот, обожает спать на солнце.',
        'breed': 'Беспородный',
        'gender': 'male',
        'age': 4,
        'health': [],
    },
    {
        'cat_name': 'Мурка',
        'cat_information': 'Полосатая кошка, всегда встречает гостей у двери.',
        'breed': 'Европейская короткошёрстная',
        'gender': 'female',
        'age': 3,
        'health': [
            {'date': '2026-10-09', 'status': 'observation', 'weight': 3.6, 'note': 'Плохо ест, наблюдаем'},
        ],
    },
    {
        'cat_name': 'Персик',
        'cat_information': 'Пушистый перс, главный любитель сметаны.',
        'breed': 'Персидская',
        'gender': 'male',
        'age': 6,
        'health': [],
    },
    {
        'cat_name': 'Луна',
        'cat_information': 'Чёрная кошка с янтарными глазами, любит сидеть на подоконнике.',
        'breed': 'Бомбейская',
        'gender': 'female',
        'age': 2,
        'health': [
            {'date': '2026-09-30', 'status': 'healthy', 'weight': 3.2, 'note': 'Плановый осмотр'},
            {'date': '2026-10-07', 'status': 'sick', 'weight': 3.0, 'note': 'Насморк, назначены капли'},
        ],
    },
    {
        'cat_name': 'Снежок',
        'cat_information': 'Белоснежный кот, спокойный и очень ласковый.',
        'breed': 'Турецкая ангора',
        'gender': 'male',
        'age': 5,
        'health': [
            {'date': '2026-10-02', 'status': 'healthy', 'weight': 4.8, 'note': 'Прививка от бешенства'},
        ],
    },
    {
        'cat_name': 'Соня',
        'cat_information': 'Голубая британка, может проспать весь день у камина.',
        'breed': 'Британская',
        'gender': 'female',
        'age': 7,
        'health': [
            {'date': '2026-09-25', 'status': 'observation', 'weight': 5.6, 'note': 'Лишний вес, диета'},
            {'date': '2026-10-05', 'status': 'healthy', 'weight': 5.3, 'note': 'Вес снижается'},
        ],
    },
]


def seed(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    cathealth = apps.get_model('api', 'cathealth')
    for item in CATS:
        cat, _ = catdb.objects.get_or_create(
            cat_name=item['cat_name'],
            defaults={'cat_information': item['cat_information']},
        )
        cat.breed = item['breed']
        cat.gender = item['gender']
        cat.age = item['age']
        cat.save()
        for record in item['health']:
            cathealth.objects.get_or_create(cat=cat, date=record['date'], defaults=record)


def drop(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    catdb.objects.filter(cat_name__in=[c['cat_name'] for c in CATS[3:]]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_cat_details'),
    ]

    operations = [
        migrations.RunPython(seed, drop),
    ]
