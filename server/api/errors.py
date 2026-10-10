from django.http import JsonResponse


def not_found(request, exception):
    return JsonResponse({'error': 'Не найдено'}, status=404)


def server_error(request):
    return JsonResponse({'error': 'Внутренняя ошибка сервера'}, status=500)
