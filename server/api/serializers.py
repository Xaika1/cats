from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import profiles, catdb, cathealth


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=False, allow_blank=True, default='')

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')

    def validate(self, attrs):
        if User.objects.filter(username__iexact=attrs['username']).exists():
            raise serializers.ValidationError({'username': 'Пользователь с таким именем уже существует.'})
        email = attrs.get('email', '')
        if email and User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({'email': 'Пользователь с таким email уже существует.'})
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({'password2': 'Пароли не совпадают.'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_active=True,
        )
        user.set_password(validated_data['password'])
        user.save()
        profiles.objects.create(user=user)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'is_staff')
        read_only_fields = ('id', 'username', 'date_joined', 'is_staff')


def last_record(cat):
    records = list(cat.health.all())
    return records[0] if records else None


class CatSerializer(serializers.ModelSerializer):
    cat_url = serializers.ImageField(required=False, allow_null=True, write_only=True)
    remove_photo = serializers.BooleanField(required=False, default=False, write_only=True)
    photo = serializers.SerializerMethodField()
    gender_display = serializers.CharField(source='get_gender_display', read_only=True)
    last_status = serializers.SerializerMethodField()
    last_status_display = serializers.SerializerMethodField()
    last_date = serializers.SerializerMethodField()
    last_weight = serializers.SerializerMethodField()
    health_count = serializers.SerializerMethodField()

    class Meta:
        model = catdb
        fields = ('id', 'cat_name', 'cat_information', 'breed', 'gender', 'gender_display', 'age',
                  'cat_url', 'remove_photo', 'photo', 'photo_credit',
                  'last_status', 'last_status_display', 'last_date', 'last_weight', 'health_count')
        read_only_fields = ('photo_credit',)
        extra_kwargs = {
            'cat_name': {'required': True, 'allow_blank': False},
        }

    def validate_cat_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError('Введите кличку.')
        return value

    def validate_age(self, value):
        if value is not None and value > 30:
            raise serializers.ValidationError('Возраст не может быть больше 30 лет.')
        return value

    def create(self, validated_data):
        validated_data.pop('remove_photo', None)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        remove = validated_data.pop('remove_photo', False)
        new_photo = validated_data.get('cat_url')
        if (remove or new_photo) and instance.cat_url:
            instance.cat_url.delete(save=False)
        if remove or new_photo:
            instance.photo_credit = ''
        if remove and not new_photo:
            validated_data['cat_url'] = None
        return super().update(instance, validated_data)

    def get_photo(self, obj):
        if not obj.cat_url:
            return ''
        request = self.context.get('request')
        return request.build_absolute_uri(obj.cat_url.url) if request else obj.cat_url.url

    def get_last_status(self, obj):
        record = last_record(obj)
        return record.status if record else ''

    def get_last_status_display(self, obj):
        record = last_record(obj)
        return record.get_status_display() if record else ''

    def get_last_date(self, obj):
        record = last_record(obj)
        return record.date.isoformat() if record else ''

    def get_last_weight(self, obj):
        record = last_record(obj)
        return record.weight if record else None

    def get_health_count(self, obj):
        return len(obj.health.all())


class CatHealthSerializer(serializers.ModelSerializer):
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    cat_name = serializers.CharField(source='cat.cat_name', read_only=True)

    class Meta:
        model = cathealth
        fields = ('id', 'cat', 'cat_name', 'date', 'status', 'status_display', 'weight', 'note')
        read_only_fields = ('cat',)

    def validate_weight(self, value):
        if value is not None and not 0 < value < 30:
            raise serializers.ValidationError('Вес должен быть от 0 до 30 кг.')
        return value
