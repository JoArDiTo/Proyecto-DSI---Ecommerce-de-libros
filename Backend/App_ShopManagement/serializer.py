from rest_framework import serializers
from .models import *
from App_BooksManagement.serializer import BookSerializer

class ItemCartSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCart
        fields = "__all__"

class ShoppingCartSerializer(serializers.ModelSerializer):
    books = BookSerializer(many=True, read_only=True)
    
    class Meta:
        model = ShoppingCart
        fields = "__all__"
        
class ShoppingCartDataToFronted(serializers.ModelSerializer):
    itemsCart = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    class Meta:
        model = ShoppingCart
        fields = ('id', 'user', 'itemsCart', 'total')
    
    def get_itemsCart(self, obj):
        itemsCart = obj.itemcart_set.values_list('id', flat=True)
        return ItemCartSerializer(ItemCart.objects.filter(id__in=itemsCart), many=True).data
    
    def get_total(self, obj):
        itemsCart = obj.itemcart_set.values_list('id', flat=True)
        total = 0
        for item in ItemCart.objects.filter(id__in=itemsCart):
            total += item.book.price * item.quantity
        return total

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = "__all__"
        

