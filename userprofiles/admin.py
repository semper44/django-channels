from django.contrib import admin
from .models import Profile, Relationship, blockedusers

# Register your models here.


# class ProfileAdmin(GuardedModelAdmin):
#     pass

# admin.site.register(Profile,ProfileAdmin)
admin.site.register(Profile)
admin.site.register(Relationship)
admin.site.register(blockedusers)

