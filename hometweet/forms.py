# from django.contrib.auth.models import User
from django.forms import ModelForm
from django import forms
from .models import Coment, Post, Reply, Status


class make_tweet_form(ModelForm):
    class Meta:
        model = Post
        fields = ["content", "file"]

class make_status_form(ModelForm):
    class Meta:
        model = Status
        fields = ["text", "file"]


class Reply_form(ModelForm):
    class Meta:
        model =  Reply
        fields = ["reply_author","reply","reply_pics"]

class Comment_form(ModelForm):
    class Meta:
        model =  Coment
        fields = ["comment_post","comment_author","comments","comment_pics"]


        # referring_url=forms.CharField(widget=forms.HiddenInput(), required=False)