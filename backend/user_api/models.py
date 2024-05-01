from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.core.exceptions import ValidationError
class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None, **extra_fields):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email, **extra_fields)
		# user = self.create_user(email, password)
		user.is_staff = True
		user.is_superuser = True
		user.set_password(password)
		user.save(using=self._db)
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	firstname = models.CharField(max_length=50, blank=True)
	lastname = models.CharField(max_length=50, blank=True)
	contact = models.CharField(max_length=15, blank=True)
	is_staff = models.BooleanField(default=False)
	user_profile = models.ImageField(null=True, blank=True, upload_to='images/')
	
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username

class CarListing(models.Model):

	car_id = models.AutoField(primary_key=True)
	make = models.CharField(max_length=50, blank=True)
	model = models.CharField(max_length=50, blank=True)
	model_year = models.PositiveIntegerField(blank=True)
	daily_rate = models.IntegerField(blank=True)
	transmission = models.CharField(max_length=20, blank=True)
	image_file = models.ImageField(blank=True, upload_to='car_images/')
	available = models.BooleanField(default=True)

class RentalBooking(models.Model):

	car = models.ForeignKey(CarListing, on_delete=models.CASCADE)
	pick_address = models.CharField(max_length=50)
	pick_contact = models.CharField(max_length=11)
	pick_date = models.DateField()
	pick_time = models.TimeField()
	drop_address = models.CharField(max_length=50)
	drop_contact = models.CharField(max_length=11)
	drop_date = models.DateField()
	drop_time = models.TimeField()
	total_price = models.IntegerField(default=0)
	current_user = models.ForeignKey(AppUser, on_delete=models.CASCADE)

class Feedback(models.Model):

	rating = models.IntegerField()
	comment = models.CharField(max_length=100, blank=True)
	date_posted = models.DateField(auto_now_add=True, null=True)
	car_id = models.IntegerField(null=True)
	username = models.CharField(max_length=100, blank=True)
	user_profile = models.CharField(max_length=100, blank=True)