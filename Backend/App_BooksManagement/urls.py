from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls 
from . import views

router = routers.DefaultRouter()
router.register(r'libros', views.LibroView, 'libros')
router.register(r'categorias', views.CategoryView, 'categorias')
router.register(r'libroCategoria', views.CategoryBookView, 'libroCategoria')
router.register(r'dataToFronted', views.DataToFrontend, 'dataToFronted')

 #El REST me permitirá hacer las operacinoes GET, POST, PUT and DELETE
urlpatterns = [
    path("api/", include(router.urls)),
    #path("docs/", include_docs_urls(title="Libros API"))    
]