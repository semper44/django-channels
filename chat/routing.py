# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    # re_path(r'ws/chat/(?P<room_name>\w+)/$', consumers.ChatConsumer),
    re_path(r'ws/home/', consumers.OnlineConsumer.as_asgi()),
    re_path(r'^ws/chat/(?P<room_name>\w+)/$', consumers.TryConsumer.as_asgi()),
    re_path(r'^ws/messages/(?P<room_name>\w+)/(?P<receiver>\w+)/$', consumers.TryConsumer.as_asgi()),

]
