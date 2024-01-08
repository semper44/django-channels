from django.urls import path
from .views import (join_group, post_on_group,  create_group, exit_group,group_view, 
                    group_search,delete_user_from_group, list_all_groups,
                    save_comment_view,
                    comment_view,
                    reply_view,
                    save_reply_view,
                    approve_post,
                    owner_delete_group,
                    delete_group_post,
                    group_like_post,
                    change_group_cover_picture,
                    make_admin
                    )


urlpatterns = [
    path('create-group/', create_group, name="create-group"),
    path('group_like_post/', group_like_post, name="group_like_post"),
    path('change_group_cover_picture/<str:name>/', change_group_cover_picture, name="change_group_cover_picture"),
    path('post-on-group/<str:name>/', post_on_group, name="post-on-group"),
    path('join-group/<int:id>/', join_group, name="join-group"),
    path('owner_delete_group/<int:groupid>/', owner_delete_group, name="delete-group"),
    path('group-view/<str:name>/', group_view, name="group-view"),
    path('make_admin/<int:userid>/<str:groupname>/', make_admin, name="make_admin"),
    path('exit-group/<int:id>/', exit_group, name="exit-group"),
    path('approve_post/<int:groupid>/<int:postid>/', approve_post, name="approve_post"),
    path('delete_group_post/<int:groupid>/<int:postid>/', delete_group_post, name="delete_group_post"),
    path('delete_user_from_group/<int:userid>/<int:groupid>/', delete_user_from_group, name="deleteusergroup"),
    path('group_search/<int:id>/', group_search, name="group_search"),
    path('allgroups/', list_all_groups, name="allgroups"),
     path('group/comment/save/<slug:post_slug>/', save_comment_view, name="groupcommentsave"),
    path('group/comments/<slug:slug>/', comment_view, name="groupcomments"),
    path('group/reply/<int:comment_id>/', reply_view, name="groupreply"),
    path('group/reply/save/<int:comment_id>/', save_reply_view, name="groupreply"),
]