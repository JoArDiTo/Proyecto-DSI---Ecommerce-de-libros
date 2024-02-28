from django.db import models
from App_UserManagement.models import User
from App_BooksManagement.models import Book

class ShoppingCart(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        text = "{0} - Carrito de {1}"
        return text.format(self.id, self.user.username)
    
    
class ItemCart(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True)
    shoppingCart = models.ForeignKey(ShoppingCart, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    date = models.DateField(auto_now=True)
    
    def __str__(self):
        text = '{0} - Carrito de {1} - {2} - {3} unid'
        return text.format(self.id, self.shoppingCart.user.username, self.book.title, self.quantity)

class CreditCard(models.Model):
    number = models.CharField(primary_key=True, max_length=16, unique=True)
    holderName = models.ForeignKey(User, on_delete=models.CASCADE)
    expirationDate = models.DateField()
    cvv = models.CharField(max_length=3)
    
    def __str__(self):
        text = "{0} - {1}"
        return text.format(self.number, self.holderName.username)

