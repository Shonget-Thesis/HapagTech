from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from rest_framework import status
import logging
from .serializers import UserSerializer
from .models import User

logger = logging.getLogger(__name__)

class RegisterView(APIView):
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            logger.info(f"User created with email: {user.email}")
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': serializer.data
            }, status=status.HTTP_201_CREATED)
        logger.error(f"Registration failed: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        logger.info(f"Attempting to authenticate user with email: {email}")

        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError

        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.filter(email=email).first()

            # Generic error message to avoid user enumeration
            generic_error = {'error': 'Invalid credentials'}

            if not user:
                logger.warning(f"Authentication failed for email: {email}")
                return Response(generic_error, status=status.HTTP_401_UNAUTHORIZED)

            if not user.check_password(password):
                logger.warning(f"Authentication failed for email: {email}")
                return Response(generic_error, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': UserSerializer(user).data
            })

        except Exception as e:
            logger.error(f"Error during authentication: {str(e)}")
            return Response({'error': 'Authentication error'}, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        return Response(UserSerializer(request.user).data)

class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            # Don't allow password update through this endpoint for security
            if 'password' in serializer.validated_data:
                serializer.validated_data.pop('password')
            
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request):
        # Handle partial updates
        return self.put(request)

class ProfilePictureUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request):
        try:
            user = request.user

            # Check if the file is provided
            if 'profile_picture' not in request.FILES:
                return Response({"error": "No image provided"}, status=status.HTTP_400_BAD_REQUEST)

            # Save the profile picture
            user.profile_picture = request.FILES['profile_picture']
            user.save()

            # Return the URL of the uploaded image - Add explicit URL retrieval
            return Response({
                "message": "Profile picture updated successfully",
                "profile_picture": user.profile_picture.url if user.profile_picture else None
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logger.error(f"Error updating profile picture: {str(e)}")
            return Response({
                "error": f"Error updating profile picture: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)

class TokenRefreshView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)
                
            token = RefreshToken(refresh_token)
            return Response({
                'access': str(token.access_token),
            })
        except Exception as e:
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)

class DietaryPreferencesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request):
        user = request.user
        dietary_fields = [
            'is_vegetarian', 'is_vegan', 'is_pescatarian', 
            'is_flexitarian', 'is_paleo', 'is_ketogenic', 
            'is_halal', 'is_kosher', 'is_fruitarian', 
            'is_gluten_free', 'is_dairy_free', 'is_organic'
        ]
        
        # Extract only dietary preference fields from request data
        dietary_data = {k: v for k, v in request.data.items() if k in dietary_fields}
        
        # Update user model with dietary preferences
        for field, value in dietary_data.items():
            setattr(user, field, value)
        
        user.save()
        
        return Response(UserSerializer(user).data)