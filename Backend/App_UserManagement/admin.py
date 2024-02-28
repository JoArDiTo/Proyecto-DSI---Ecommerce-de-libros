from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
# Register your models here.
from .models import User, Person

#admin.site.register(User)
admin.site.register(Person)
# Desregistrando el modelo User
# Definiendo el administrador personalizado

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['id','email', 'username', 'person']
    fieldsets = (
        ('USER INFORMATION', {'fields': ('id','username', 'email', 'password', 'person')}),
        ('ACCESS', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('id','email', 'username', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions', 'person')}
        ),
    )
    search_fields = ['email', 'username']
    ordering = ['email']

admin.site.register(User, CustomUserAdmin)