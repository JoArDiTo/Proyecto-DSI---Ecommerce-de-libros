from rest_framework import serializers
from .models import Book, Category, CategoryBook

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = "__all__"

class CategoryBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryBook
        fields = "__all__"
        
class DataToFrontendSerializer(serializers.ModelSerializer):
    categories = serializers.SerializerMethodField()
    class Meta:
        model = Book
        fields = ('id', 'isActive', 'title', 'author', 'description', 'price', 'stock','image', 'categories')

    def get_categories(self, obj):
        categories = obj.categorybook_set.values_list('category_id', flat=True)
        return CategorySerializer(Category.objects.filter(id__in=categories), many=True).data
