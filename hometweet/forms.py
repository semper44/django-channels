# from django.contrib.auth.models import User
from django.forms import ModelForm
from django import forms
from .models import Coment, Post, Reply, Status


class make_tweet_form(ModelForm):
    class Meta:
        model = Post
        fields = ["content", "file"]
    # def __init__(self, *args, **kwargs):
    #     print("Form data:", args[0])  # Check the data being passed
    #     print("Form files:", kwargs.get('files'))  # Check the files being passed
    #     super().__init__(*args, **kwargs)


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