from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls 
from . import views

router = routers.DefaultRouter()
router.register(r'ShoppingCart', views.ShoppingCartView, 'ShoppingCart')
router.register(r'itemCart', views.ItemCartView, 'itemCart')
router.register(r'creditCard', views.CreditCardView, 'creditCard')
#router.register(r'invoice', views.InvoiceView, 'invoice')
#router.register(r'purchaseHistory', views.PurchaseHistoryView, 'purchaseHistory')
#Data to frontend:
router.register(r'shopDataToFronted', views.ShoppingCartDataToFrontedView, 'shopDataToFronted')
router.register(r'invoceDataToFronted', views.ShoppingCartDataToFrontedView, 'invoceDataToFronted')
#router.register(r'purchaseHistoryDataToFronted', views.PurchaseHistoryDataToFrontedView, 'purchaseHistoryDataToFronted')


 #El REST me permitirá hacer las operacinoes GET, POST, PUT and DELETE
urlpatterns = [
    path("api/", include(router.urls)),
    #ver un carrito con especifico con la id del usuario
    #path("api/ShoppingCart/user/<str:user_id>/", views.ShoppingCartDetail.as_view(), name='shoppingcart-user-detail'),
    #path("docs/", include_docs_urls(title="Libros API"))    
]