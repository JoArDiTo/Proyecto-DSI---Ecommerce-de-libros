from django.db import models
#import OS
import os

# Create your models here.

class Category(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Book(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.IntegerField()
    image = models.CharField(max_length=300, default="../src/img/bookImageDefault.webp")
    isActive = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class CategoryBook(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('book', 'category')

    def __str__(self):
        return f"{self.book.title} - {self.category.name}"
