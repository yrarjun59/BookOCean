from django.urls import path
from . import views

urlpatterns = [
   path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', views.registerUser, name='register-user'),
    
    path('profile/', views.getUserProfile, name='user-profile'),
     path('profile/update/', views.updateUserProfile, name="user-profile-update"),

    path('', views.getUsers, name='get-users'),
    path('<str:pk>/', views.getUserById, name='user=details'),


    path('update/<str:pk>/', views.updateUser, name='user-update'),

    path('delete/<str:pk>/', views.deleteUser, name='user-delete'),
]