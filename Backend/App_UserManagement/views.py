from rest_framework import viewsets
from .serializer import *
from .models import User

from rest_framework.permissions import IsAuthenticated, AllowAny

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            # Allow any client to create a new user
            permission_classes = [AllowAny]
        else:
            # For other operations, require authentication
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
class PersonView(viewsets.ModelViewSet):
    serializer_class = PersonSerializer
    queryset = Person.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            # Allow any client to create a new person
            permission_classes = [AllowAny]
        else:
            # For other operations, require authentication
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
class UserDataToFrontedView(viewsets.ModelViewSet):
    serializer_class = UserDatatoFronted
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

