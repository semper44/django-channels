from django.urls import path
from .views import (
    register_view,
    login_view,
    profile_view,
    find_friends,
    remove_friend_view,
    add_friend_view,
    view_sent_request,
    logout_view,
    view_received_request,
    search_view,
    block_user_view,
    decline_sent_request,
    accept_sent_request,
    find_friends_templates,
    group_search_view,
    search_view_template,
    reset_notif,
    change_profile_picture,
    delete_user_post
    # trytry
)




urlpatterns = [
    path('register/', register_view, name = "register"),
    path('reset_notif/', reset_notif, name = "reset_notif"),
    path('change_profile_picture/', change_profile_picture, name = "change_profile_picture"),
    path('login/', login_view, name = "login"),
    path('profile/<str:name>/', profile_view, name = "profile"),
    path('findfriends/', find_friends, name = "findfriends"),
    path('find_friends_templates/', find_friends_templates, name = "find_friends_templates"),
    path('removefriends/<str:friend>/', remove_friend_view, name = "removefriends"),
    path('addfriends/<str:friend>/', add_friend_view, name = "addfriends"),
    path('declinefriendrequest/<int:id>/', decline_sent_request, name = "declinefriendrequest"),
    path('delete_user_post/<int:postid>/', delete_user_post, name = "delete_user_post"),
    path('acceptfriendrequests/<int:rid>/', accept_sent_request, name = "acceptfriendrequests"),
    path('viewsentrequest/', view_sent_request, name = "viewsentrequest"),
    path('received_request/', view_received_request, name = "view_received_request"),
    path('logout/', logout_view, name = "logout"),
    path('search/', search_view, name = "search"),
    path('group_search_view/', group_search_view, name = "group_search_view"),
    path('search_view/', search_view_template, name = "search_view_template"),
    path('blockuser/<str:username>/', block_user_view, name = "blockuser"),
    # path('try/', trytry, name = "trytry"),

]