from django.shortcuts import render
from django.core.cache import cache
from django.utils.timezone import now
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer, RequestOTPSerializer
from .renderers import UserRednderer
from .models import OTP
from .utils import send_otp_via_sms
from .models import User
import random
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RequestOTPView(APIView):
    def post(self, request, format=None):
        mobile = request.data.get('mobile')
        if not mobile:
            return Response({'error': 'Mobile number is required'}, status=400)
        
        otp = random.randint(100000, 999999) 
        otp_entry, created = OTP.objects.update_or_create(
            mobile=mobile,
            defaults={'otp': otp}
        )
        sms_response = send_otp_via_sms(mobile, otp)
        if sms_response:
            return Response({'msg': 'OTP sent successfully'}, status=200)
        else:
            return Response({'error': 'Failed to send OTP'}, status=500)
        
class UserRegistrationView(APIView):
    renderer_classes = [UserRednderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            print("Validated data : ",serializer.validated_data)
            mobile = serializer.validated_data['mobile']
            otp = random.randint(100000, 999999) 
            print("OTP is : ",otp)
            cache.set(f"otp_{mobile}", {
                "email": serializer.validated_data['email'],
                "name": serializer.validated_data['name'],
                "mobile": mobile,
                "password": serializer.validated_data['password'],
                "password2": serializer.validated_data['password2'],
                "tc": serializer.validated_data['tc'],
                "otp": otp
            }, timeout=300)
            # send_otp_via_sms(mobile,otp)
            # user = serializer.save()
            # token = get_tokens_for_user(user)
            # mobile = serializer.validated_data['mobile']
            send_otp_via_sms(mobile,otp)
            return Response({'msg': 'OTP sent to mobile Number.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    renderer_classes = [UserRednderer]
    def post(self, request, format=None):
        print(request.data)
        mobile = request.data.get('mobile')
        otp = request.data.get('otp')
        if not mobile or not otp:
            return Response({'error': 'Mobile number and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)
        data = cache.get(f"otp_{mobile}") 
        if not data:
            return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST) 
        print("Cached OTP Data:", data) 
        if str(data['otp']) == str(otp): 
            user = User.objects.create_user(
                email=data['email'],
                name=data['name'],
                mobile=data['mobile'],
                password=data['password'],
                tc=data['tc']
            )
            user.save()
            # Clear cache after successful registration
            cache.delete(f"otp_{mobile}")
            return Response({'msg': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email,password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token':token,'msg':'Login Success'},status=status.HTTP_200_OK)
            else:
                return Response({'errors':{'non_field_errors':['Email or password is not valid']}},status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class UserProfileView(APIView):
    renderer_classes = [UserRednderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        user = request.user
        serializer = UserProfileSerializer(user) 
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserChangePasswordView(APIView):
    renderer_classes = [UserRednderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data , context={'user':request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password changed'},status=status.HTTP_200_OK)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRednderer]
    def post(self, request, format = None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password reset link sned. Please check your email'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserPasswordResetView(APIView):
    renderer_classes = [UserRednderer]
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid':uid,'token':token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Password reset Successfully'},status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        