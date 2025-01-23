from xml.dom import ValidationErr
from rest_framework import serializers
from .models import User
from .utils import Util
from .models import OTP
from django.utils.encoding import smart_str,force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode,urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'})
    mobile = serializers.CharField(max_length=15)

    class Meta:
        model = User
        fields = ['email', 'name', 'mobile', 'password', 'password2', 'tc']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        password =attrs.get('password')
        password2 =attrs.get('password2')
        mobile =attrs.get('mobile')

        if password != password2:
            raise serializers.ValidationError("password does not match")

        if not mobile.isdigit():
            raise serializers.ValidationError("Mobile number must contain only digits.")
        
        if len(mobile) < 10 or len(mobile) > 15:
            raise serializers.ValidationError("Mobile number must be between 10 and 15 digits.")
        
        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class RequestOTPSerializer(serializers.Serializer):
    mobile = serializers.CharField(max_length=15)

    def validate_mobile(self, value):
        # Add mobile validation logic if required
        if not value.isdigit():
            raise serializers.ValidationError("Invalid mobile number")
        return value

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email','password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email','name']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style = {'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length = 255, style = {'input_type':'password'},write_only=True)
    class Meta:
        fields = ['password','password2']
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and confrim password doesnot match")
        user.set_password(password)
        user.save()
        return super().validate(attrs)
    
class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length = 255)
    class Meta:
        fields = ['email']
    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            print("encoded Uid", uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print("Token",token)
            link = 'http://127.0.0.1:8000/api/user/reset-password/'+uid+'/'+token
            print('password reset link ', link)
            body = 'Click the linkto reset password' + link
            data = {
                'subject':'Reset your password',
                'body': body,
                'to_email':user.email
            }
            Util.send_email(data)
            return attrs
        else:
            raise ValidationErr('You are not registered user')
        
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length = 255, style = {'input_type':'password'},write_only=True)
    password2 = serializers.CharField(max_length = 255, style = {'input_type':'password'},write_only=True)
    class Meta:
        fields = ['password','password2']
    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Password and confrim password doesnot match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not valid or expired')
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is not valid or expired')
            
