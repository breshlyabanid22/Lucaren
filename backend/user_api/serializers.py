from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from . models import CarListing, RentalBooking
UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = '__all__'
	def create(self, clean_data):
		user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
		user_obj.username = clean_data['username']
		user_obj.save()
		return user_obj

class UserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	##
	def check_user(self, clean_data):
		email = clean_data['email']
		password = clean_data['password']
		print(email)
		print(password)
		user = authenticate(username=email, password=password)
		print('Authenticated:', user)
		if not user:
			raise ValidationError('User does not exist.')
			
		if not user.check_password(password):
			raise ValidationError('Incorrect password. Please try again.')
		return user

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = UserModel
		fields = ('email', 'username', 'firstname', 'lastname', 'contact', 'user_profile')

		def update(self, instance, validated_data):
			user_profile_data = validated_data.pop('user_profile', None)
			if user_profile_data is not None:
				instance.user_profile = user_profile_data
			return super().update(instance, validated_data)

class CarListingSerializer(serializers.ModelSerializer):
	class Meta:
		model = CarListing
		fields = '__all__'

class RentalBookingSerializer(serializers.ModelSerializer):
	class Meta:
		model = RentalBooking
		fields = '__all__'

	def validate(self, data):
		pick_date = data.get('pick_date')
		drop_date = data.get('drop_date')

		if drop_date <= pick_date:
			raise ValidationError("Drop off date must be after pick up date.")
		return data
		