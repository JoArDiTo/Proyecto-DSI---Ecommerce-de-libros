from rest_framework import viewsets, generics
from .serializer import *
from .models import ShoppingCart, ItemCart
from App_UserManagement.models import User

class ShoppingCartView(viewsets.ModelViewSet):
    serializer_class = ShoppingCartSerializer
    queryset = ShoppingCart.objects.all()
    
class ItemCartView(viewsets.ModelViewSet):
    serializer_class = ItemCartSerializer
    queryset = ItemCart.objects.all()

class ShoppingCartDataToFrontedView(viewsets.ModelViewSet):
    serializer_class = ShoppingCartDataToFronted
    queryset = ShoppingCart.objects.all()
    
class CreditCardView(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = CreditCard.objects.all()
