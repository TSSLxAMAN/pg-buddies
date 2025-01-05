from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializer import UserRegistrationSerializer,UserLoginSerializer,UserProfileSerializer, UserChangePasswordSerializer, SendPasswordResetEmailSerializer, UserPasswordResetSerializer

from rest_framework import status
from django.contrib.auth import authenticate
from .renderers import UserRednderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRednderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response({'msg':'Registration Successsful','token':token },status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
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
        