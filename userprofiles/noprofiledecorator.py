from django.shortcuts import redirect
from functools import wraps
from django.contrib.auth.decorators import user_passes_test

def is_special_user(user):
    is_superuser = user.is_superuser
    is_moderator = getattr(user, 'is_moderator', False)

    result = is_superuser or is_moderator
    print(f"User {user.username} is a special user: {result}")
    return result

def special_user_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if is_special_user(request.user):
            print('itsfalse')
            # If the user is a special user, redirect to the login URL
            return redirect('no_profile_page')
        else:
            print('itstrue')

            # If the user is not a special user, call the original view function
            return view_func(request, *args, **kwargs)

    return _wrapped_view