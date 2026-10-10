from django.db import migrations

CATS = [
    {
        'cat_name': 'Барсик',
        'cat_information': 'Рыжий домашний кот, обожает спать на солнце.',
        'health': [
            {'date': '2026-10-01', 'status': 'healthy', 'weight': 4.5, 'note': 'Плановый осмотр'},
            {'date': '2026-10-08', 'status': 'healthy', 'weight': 4.3, 'note': 'Вес в норме'},
        ],
    },
    {
        'cat_name': 'Мурка',
        'cat_information': 'Полосатая кошка, всегда встречает гостей у двери.',
        'health': [
            {'date': '2026-10-03', 'status': 'healthy', 'weight': 3.8, 'note': 'Всё хорошо'},
        ],
    },
    {
        'cat_name': 'Персик',
        'cat_information': 'Пушистый перс, главный любитель сметаны.',
        'health': [
            {'date': '2026-09-28', 'status': 'healthy', 'weight': 5.1, 'note': 'Прививка сделана'},
            {'date': '2026-10-06', 'status': 'healthy', 'weight': 5.0, 'note': 'Чувствует себя отлично'},
        ],
    },
]


def seed(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    cathealth = apps.get_model('api', 'cathealth')
    for cat in CATS:
        record, created = catdb.objects.get_or_create(
            cat_name=cat['cat_name'],
            defaults={'cat_information': cat['cat_information']},
        )
        if not created:
            continue
        for item in cat['health']:
            cathealth.objects.create(cat=record, **item)


def drop(apps, schema_editor):
    catdb = apps.get_model('api', 'catdb')
    catdb.objects.filter(cat_name__in=[cat['cat_name'] for cat in CATS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_catdb_cathealth'),
    ]

    operations = [
        migrations.RunPython(seed, drop),
    ]
