from django.urls import path, include
from rest_framework import routers
from rest_framework.documentation import include_docs_urls 
from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users', UserView, 'users')
router.register(r'persons', PersonView, 'persons')
router.register(r'usersDataToFrontend', UserDataToFrontedView, 'usersDataToFrontend')

urlpatterns = [
    path('api/', include(router.urls)),
    path("docs/", include_docs_urls(title="Users API")),
    #jwt
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]