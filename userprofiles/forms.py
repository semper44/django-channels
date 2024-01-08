# from django.contrib.auth import get_user_model
from user.models import CustomUser
from django import forms
from django.contrib.auth.forms import UserCreationForm


class register_form(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ["email","username"]

class ProfilePictureForm(forms.ModelForm):
    class Meta:
        model = CustomUser
        fields = ['prof_pics']


