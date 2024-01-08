from django.contrib import admin
from .models import UserGroups_Post, UserGroups,Group_coment, Group_reply

# Register your models here.
admin.site.register(UserGroups)
admin.site.register(UserGroups_Post)
admin.site.register(Group_coment)
admin.site.register(Group_reply)
