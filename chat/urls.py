# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    # path('', views.index, name='index'),
    # path('<str:room_name>/', views.room, name='room'),
     path('', views.home_view, name="home"),
    path('messages/', views.chatIntialMessage, name="chatintialmessage"),
    path('selfmessages/', views.chatIntialMessageJson, name="chatintialmessageJson"),
    path('chat/<str:receiver>/', views.personalInitialMessages, name="personalinitialessages"),

]
