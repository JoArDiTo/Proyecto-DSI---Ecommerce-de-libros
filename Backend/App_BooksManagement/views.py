from rest_framework import viewsets
from .serializer import BookSerializer, CategorySerializer, CategoryBookSerializer, DataToFrontendSerializer
from .models import Book, Category, CategoryBook

# Create your views here.
class LibroView(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    queryset = Book.objects.all()
    
class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    
class CategoryBookView(viewsets.ModelViewSet):
    serializer_class = CategoryBookSerializer
    queryset = CategoryBook.objects.all()
    
#class ActiveBookView(viewsets.ModelViewSet):
#    serializer_class = BookSerializer
#    queryset = Book.objects.filter(isActive=True)

class DataToFrontend(viewsets.ModelViewSet):
    serializer_class = DataToFrontendSerializer
    queryset = Book.objects.all()

