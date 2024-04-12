from django.urls import path
from . import views


urlpatterns = [
	path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('user/profile', views.UserProfileUpdate.as_view(), name='user-profile-update'),
    path('carlisting', views.CarListingView.as_view(), name='carlisting'),
    path('carlisting/<int:pk>/', views.UpdateCarListingView.as_view(), name='carlisting_update'),
    path('rental-booking/<int:fk>/', views.RentalBookingView.as_view(), name='rental-booking'),
    path('rental-booking-details', views.RentalBookingDetails.as_view(), name='rental-booking-details'),
    path('feedback', views.FeedbackView.as_view(), name='feedback'),

]
