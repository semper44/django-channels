from django.urls import path
from .views import (reply_view,comment_view,create_post_view,
                    save_comment_view,save_reply_view, 
                    create_status_view,like_post,
                    notification_view,
                    try_view)


urlpatterns = [
    # path('profiles', UserProfile, name="profiles"),
    # path('create_tweet/', make_tweet_view, name="make-tweet"),
    path('try/', try_view, name="try_view"),
    path('create_post/', create_post_view, name="create_post"),
    path('create_status/', create_status_view, name="create_status"),
    path('reaction/', reply_view, name="reply"),
    path('comment/save/<slug:post_slug>/', save_comment_view, name="commentsave"),
    path('comments/<slug:slug>/', comment_view, name="comments"),
    path('reply/<int:comment_id>/', reply_view, name="reply"),
    path('reply/save/<int:comment_id>/', save_reply_view, name="reply"),
    path('like_post/', like_post, name='like_post'),
    path('notification_view/', notification_view, name='notification_view'),
]
