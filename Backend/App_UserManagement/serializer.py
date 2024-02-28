from rest_framework import serializers
from .models import User, Person
from django.contrib.auth.models import Group, Permission

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(many=True, queryset=Group.objects.all(), required=False)
    user_permissions = serializers.PrimaryKeyRelatedField(many=True, queryset=Permission.objects.all(), required=False)

    class Meta:
        model = User
        fields = '__all__'
        
    def create(self, validated_data):
        permissions_data = validated_data.pop('user_permissions', [])
        groups_data = validated_data.pop('groups', [])
        password = validated_data.pop('password')
        user = User.objects.create_user(**validated_data, password=password)
        for group in groups_data:
            user.groups.add(group)
        for permission in permissions_data:
            user.user_permissions.add(permission)
        return user
        
        
class UserDatatoFronted(serializers.ModelSerializer):
    person = PersonSerializer()
    class Meta:
        model = User
        fields = ['id', 'email', 'username','password','is_active', 'is_superuser', 
                  'is_staff', 'last_login', 'person', 'groups', 'user_permissions']
        

        
            