from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.utils.dateparse import parse_date

from .serializers import RegisterSerializer, UserSerializer, CatSerializer, CatHealthSerializer
from .models import profiles, catdb, cathealth
from .serializers import last_record


class ErrorResponse(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return Response({'error': 'Not found'}, status=404)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AmIsuperUser(APIView):
    def get(self, request):
        return Response({'status_admin': request.user.is_superuser})


class ProfileView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProfileInfo(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        profile, _ = profiles.objects.get_or_create(user=user)
        return Response({
            'user_id': user.id,
            'profile_id': profile.id,
            'username': user.username,
            'email': user.email,
            'date_joined': user.date_joined,
        })


class LogoutView(APIView):
    def post(self, request):
        try:
            RefreshToken(request.data.get('refresh_token')).blacklist()
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_205_RESET_CONTENT)


class AllUsers(APIView):
    def serialize(self, queryset):
        return [
            {'profile_id': p.id, 'username': p.user.username, 'user_id': p.user.id}
            for p in queryset.select_related('user').order_by('-id')
        ]

    def get(self, request):
        return Response(self.serialize(profiles.objects.all()))

    def post(self, request):
        query = request.data.get('query')
        if not query:
            return Response({'error': 'Not found'}, status=404)
        return Response(self.serialize(profiles.objects.filter(user__username__icontains=query)))


SORTS = {
    'name': lambda cat: cat.cat_name.lower(),
    'age': lambda cat: (cat.age is None, cat.age or 0),
    '-age': lambda cat: (cat.age is None, -(cat.age or 0)),
    'last_date': lambda cat: (last_record(cat) is None, -(last_record(cat).date.toordinal() if last_record(cat) else 0)),
}


def cat_list(request):
    params = request.query_params
    queryset = catdb.objects.prefetch_related('health')

    gender = params.get('gender')
    if gender:
        queryset = queryset.filter(gender=gender)

    cats = list(queryset)

    needle = (params.get('name') or '').strip().lower()
    if needle:
        cats = [c for c in cats if needle in f'{c.cat_name} {c.cat_information} {c.breed}'.lower()]

    breed = (params.get('breed') or '').strip().lower()
    if breed:
        cats = [c for c in cats if c.breed.lower() == breed]

    cat_status = params.get('status')
    if cat_status == 'none':
        cats = [c for c in cats if last_record(c) is None]
    elif cat_status:
        cats = [c for c in cats if last_record(c) and last_record(c).status == cat_status]

    cats.sort(key=SORTS.get(params.get('sort'), SORTS['name']))
    return cats


class CatList(APIView):
    def get(self, request):
        serializer = CatSerializer(cat_list(request), many=True, context={'request': request})
        return Response(serializer.data)

    def post(self, request):
        serializer = CatSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatBreeds(APIView):
    def get(self, request):
        breeds = catdb.objects.exclude(breed='').values_list('breed', flat=True).distinct()
        return Response(sorted(set(breeds), key=str.lower))


class CatStats(APIView):
    def get(self, request):
        cats = list(catdb.objects.prefetch_related('health'))
        result = {'total': len(cats), 'healthy': 0, 'observation': 0, 'sick': 0, 'none': 0}
        for cat in cats:
            record = last_record(cat)
            result[record.status if record else 'none'] += 1
        result['records'] = cathealth.objects.count()
        return Response(result)


class CatDetail(APIView):
    def get(self, request, pk):
        cat = get_object_or_404(catdb.objects.prefetch_related('health'), pk=pk)
        return Response(CatSerializer(cat, context={'request': request}).data)

    def put(self, request, pk):
        cat = get_object_or_404(catdb, pk=pk)
        serializer = CatSerializer(cat, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        cat = get_object_or_404(catdb, pk=pk)
        if cat.cat_url:
            cat.cat_url.delete(save=False)
        cat.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CatHealthList(APIView):
    def get(self, request, pk):
        cat = get_object_or_404(catdb, pk=pk)
        queryset = cat.health.all()

        health_status = request.query_params.get('status')
        if health_status:
            queryset = queryset.filter(status=health_status)

        date_from = parse_date(request.query_params.get('date_from') or '')
        if date_from:
            queryset = queryset.filter(date__gte=date_from)

        date_to = parse_date(request.query_params.get('date_to') or '')
        if date_to:
            queryset = queryset.filter(date__lte=date_to)

        return Response(CatHealthSerializer(queryset, many=True).data)

    def post(self, request, pk):
        cat = get_object_or_404(catdb, pk=pk)
        serializer = CatHealthSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(cat=cat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CatHealthDetail(APIView):
    def get(self, request, pk):
        return Response(CatHealthSerializer(get_object_or_404(cathealth, pk=pk)).data)

    def put(self, request, pk):
        record = get_object_or_404(cathealth, pk=pk)
        serializer = CatHealthSerializer(record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        get_object_or_404(cathealth, pk=pk).delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
