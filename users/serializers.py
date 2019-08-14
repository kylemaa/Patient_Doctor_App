from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from allauth.account.adapter import get_adapter
from .models import User
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_patient', 'is_doctor')


class CustomRegisterSerializer(RegisterSerializer):
    is_patient = serializers.BooleanField()
    is_doctor = serializers.BooleanField()

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'is_patient', 'is_doctor')

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'email': self.validated_data.get('email', ''),
            'is_patient': self.validated_data.get('is_patient', ''),
            'is_doctor': self.validated_data.get('is_doctor', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.is_patient = self.cleaned_data.get('is_patient')
        user.is_doctor = self.cleaned_data.get('is_doctor')
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_patient = serializer_data.get('is_patient')
        is_doctor = serializer_data.get('is_doctor')
        return {
            'is_patient': is_patient,
            'is_doctor': is_doctor
        }
