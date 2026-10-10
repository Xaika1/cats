# Котокафе — сервер

REST API на Django для десктопного приложения «Котокафе»: сотрудники, котики, фото и журнал здоровья.

## Стек

- Django 6, Django REST Framework
- JWT (`djangorestframework-simplejwt`): access — 3 часа, refresh — 1 день, ротация и чёрный список
- SQLite (`db.sqlite3`), фото в `media/images/`

## Запуск

```bash
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r req.txt
python manage.py migrate
python manage.py runserver
```

API доступно по адресу `http://127.0.0.1:8000/api/`, админка — `http://127.0.0.1:8000/admin/` (пользователь создаётся через `python manage.py createsuperuser`).

Миграции создают таблицы и десять котиков с фото и историей здоровья. Фото взяты с Wikimedia Commons под свободными лицензиями (CC BY / CC BY-SA), автор и лицензия хранятся в поле `photo_credit` и показываются в карточке котика.

Переменные окружения:

| Переменная | По умолчанию | Назначение |
|---|---|---|
| `DJANGO_DEBUG` | `0` | режим отладки (`1` — включить) |
| `DJANGO_SECRET_KEY` | тестовый ключ | секретный ключ |
| `DJANGO_ALLOWED_HOSTS` | `127.0.0.1,localhost` | разрешённые хосты через запятую |

## База данных

| Таблица | Поля |
|---|---|
| `auth_user` | сотрудник: логин, пароль, email, имя, фамилия |
| `api_profiles` | профиль сотрудника (связь один-к-одному с пользователем) |
| `api_catdb` | котик: кличка, описание, порода, пол, возраст, фото, автор фото |
| `api_cathealth` | запись о здоровье: котик, дата, состояние (`healthy`, `observation`, `sick`), вес, заметка |

## API

Все запросы, кроме регистрации и входа, требуют заголовок `Authorization: Bearer <access>`.

| Метод | Адрес | Действие |
|---|---|---|
| POST | `/api/register/` | регистрация (`username`, `password`, `password2`, `email`, `first_name`, `last_name`) |
| POST | `/api/login/` | вход, возвращает `access` и `refresh` |
| POST | `/api/token/refresh/` | обновление токена |
| POST | `/api/logout/` | выход (`refresh_token`) |
| GET, PUT | `/api/profile/` | профиль текущего сотрудника |
| GET, POST | `/api/cats/` | список котиков / добавление (multipart, фото в поле `cat_url`) |
| GET, PUT, DELETE | `/api/cats/<id>/` | котик; `remove_photo=true` удаляет фото |
| GET | `/api/cats/breeds/` | список пород |
| GET | `/api/cats/stats/` | количество котиков по последнему состоянию |
| GET, POST | `/api/cats/<id>/health/` | журнал здоровья котика / новая запись |
| GET, PUT, DELETE | `/api/health/<id>/` | запись о здоровье |

Параметры списка котиков: `name` — поиск по кличке, породе и описанию; `status` — `healthy`, `observation`, `sick` или `none` (по последней записи); `gender` — `male` или `female`; `breed`; `sort` — `name`, `age`, `-age`, `last_date`.

Параметры журнала здоровья: `status`, `date_from`, `date_to` (формат `ГГГГ-ММ-ДД`).

## Тесты

```bash
pytest
```
