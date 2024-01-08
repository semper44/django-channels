# from xml.etree.ElementTree import Comment
from django.contrib import admin
from .models import Post, Reaction, Reply, Coment, Status, Notification

# # Register your models here.
admin.site.register(Post)
admin.site.register(Coment)
admin.site.register(Reply)
admin.site.register(Status)
admin.site.register(Notification)
admin.site.register(Reaction)
