from django.forms import ModelForm
from django import forms
from .models import UserGroups, UserGroups_Post, Group_reply, Group_coment


class Users_create_Group_form(ModelForm):
    class Meta:
        model =  UserGroups
        fields = ["name","members","cover_photo","description", "owner"]

class Users_Group_Post_form(ModelForm):
    class Meta:
        model =  UserGroups_Post
        fields = ["usergroups","text","file", "status", "author"]

class GroupcoverpictureInput(forms.ModelForm):
    class Meta:
        model = UserGroups
        fields = ['cover_photo']

class Reply_form(ModelForm):
    class Meta:
        model =  Group_reply
        fields = ["reply_author","reply","reply_pics"]

class Comment_form(ModelForm):
    class Meta:
        model =  Group_coment
        fields = ["comment_post","comment_author","comments","comment_pics"]