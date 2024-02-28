from django.db import models
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin, Group
from django.utils import timezone

class CustomUserManager(UserManager):
   def _create_user(self, email, password, **extra_fields):
       if not email:
           raise ValueError('You have not provided an email address')
       email = self.normalize_email(email)
       user = self.model(email=email, **extra_fields)
       user.set_password(password)
       user.save(using=self._db)
       
       return user
   def create_user(self, email=None, password=None, **extra_fields):
       extra_fields.setdefault('is_staff', False)
       extra_fields.setdefault('is_superuser', False)
       return self._create_user(email, password, **extra_fields)
   
   def create_superuser(self, email=None, password=None, **extra_fields):
       extra_fields.setdefault('is_staff', True)
       extra_fields.setdefault('is_superuser', True)
       return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(primary_key=True, max_length=6, blank=True, default='', unique=True)
    
    email = models.EmailField(blank=True, default='', unique=True)
    username = models.CharField(max_length=150, blank=True, default='')
    
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(default=timezone.now)
    
    person = models.ForeignKey('Person', on_delete=models.CASCADE, null=True, blank=True)
    
    groups = models.ManyToManyField(Group, verbose_name='groups', blank=True, related_name='users')
    user_permissions = models.ManyToManyField('auth.Permission', verbose_name='user permissions', blank=True, related_name='users')
    
    objects = CustomUserManager()
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['id','username']
    
    class Meta:
        verbose_name = 'Users'
        verbose_name_plural = 'Users'
        
    def get_full_name(self):
        return self.username
    
class Person(models.Model):
    id = models.CharField(primary_key=True, max_length=6, unique=True, blank=True)
    phone = models.CharField(max_length=9)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'