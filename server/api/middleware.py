from django.http import HttpResponse


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method == 'OPTIONS' and 'HTTP_ACCESS_CONTROL_REQUEST_METHOD' in request.META:
            response = HttpResponse(status=204)
        else:
            response = self.get_response(request)
        if request.path.startswith(('/api/', '/media/')):
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Authorization, Content-Type'
            response['Access-Control-Max-Age'] = '86400'
        return response
