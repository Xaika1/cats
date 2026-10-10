from django.urls import path
from .views import (
    RegisterView, ProfileView, LogoutView,
    AllUsers, AmIsuperUser, ProfileInfo, ErrorResponse,
    CatList, CatDetail, CatBreeds, CatStats, CatHealthList, CatHealthDetail,
)

urlpatterns = [
    path('', ErrorResponse.as_view(), name='error-response'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('profile-info/<int:user_id>/', ProfileInfo.as_view(), name='profile-info'),
    path('amisuperuser/', AmIsuperUser.as_view(), name='amisuperuser'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('all-users/', AllUsers.as_view(), name='all-users'),
    path('cats/', CatList.as_view(), name='cat-list'),
    path('cats/breeds/', CatBreeds.as_view(), name='cat-breeds'),
    path('cats/stats/', CatStats.as_view(), name='cat-stats'),
    path('cats/<int:pk>/', CatDetail.as_view(), name='cat-detail'),
    path('cats/<int:pk>/health/', CatHealthList.as_view(), name='cat-health'),
    path('health/<int:pk>/', CatHealthDetail.as_view(), name='health-detail'),
]
