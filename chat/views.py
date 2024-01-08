from django.shortcuts import render, redirect
from userprofiles.views import Profile
from user.models import CustomUser
from django.utils import timezone
# from django.contrib.sessions.models import Session
from django.contrib.auth.decorators import login_required
from userprofiles.models import Profile
from hometweet.models import Post, Status
from django.http import JsonResponse
from .models import Message
from django.db.models import Q
import json
from django.core.serializers.json import DjangoJSONEncoder
# from channels.layers import get_channel_layer




# from .models import Room


# def index_view(request):
#     return render(request, 'index.html', {
#         'rooms': Room.objects.all(),
#     })

# def room(request, room_name):
#     return render(request, "chat/chat.html", {"room_name": room_name})


def index(request):
    return render(request, 'chat/index.html', {})


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })

def chat(request, room_name, receiver):
    return render(request, "chat/chat.html", {"room_name": "room_name"})

@login_required(login_url="login")
def chatIntialMessage(request):
    return render(request, "chat/messages.html")
    # return JsonResponse({'messages': arr, "len":length})

@login_required(login_url="login")
def chatIntialMessageJson(request):
    arr = []
    length = False

    # Fetch the user's profile and related messages
    user_profile = Profile.objects.select_related('user').get(user=request.user)
    all_messages = Message.objects.filter(Q(receiver=user_profile) | Q(sender=user_profile)).order_by('timestamp')

    # Use a dictionary to store the last message for each sender
    last_messages = {}

    for message in all_messages:
        result = json.loads(message.content)
        last_message = result[-1]
        first_key, first_value = next(iter(last_message.items()))
        keys = last_message.values()
        result_string = "".join(keys)

        # Access the user instances associated with sender and receiver
        sender_user = message.sender.user
        receiver_user = message.receiver.user

        if sender_user.id not in last_messages or message.timestamp > last_messages[sender_user.id]['timestamp']:
            last_messages[sender_user.id] = {
                'message': first_value,
                'pics': sender_user.prof_pics.url,
                'username': sender_user.username,
                'sender': sender_user.username,
                'timestamp': message.timestamp,
            }

    # Append the last messages to the 'arr' list
    arr.extend(last_messages.values())

    if len(arr) >= 1:
        length = True

    # Return JSON response
    return JsonResponse({'messages': arr, "len": length}, encoder=DjangoJSONEncoder)



def chatIntialMessageJson(request):
    arr=[]
    length=False
    user=Profile.objects.get(user=request.user)
    allMessage= Message.objects.filter(receiver=user) | Message.objects.filter(sender=user)
    for i in allMessage:
        result=json.loads(i.content)
        lastMessage= result[-1]
        first_key, first_value= next(iter(lastMessage.items()))
        keys=lastMessage.values()
        result_string= "".join(keys)
        user= CustomUser.objects.get(profile=i.receiver)
        sender= CustomUser.objects.get(profile=i.sender)
        finalResult={"message":first_value, "pics":user.prof_pics.url, "username":user.username, "sender":sender.username}
        arr.append(finalResult)
    if len(arr)>=1:
        length=True
    # return render(request, "chat/messages.html", {'messages': arr, "len":length})
    return JsonResponse({'messages': arr, "len":length})
   
@login_required(login_url="login")
def home_view(request):
    user = request.user
    threshold_datetime = timezone.now() - timezone.timedelta(hours=24)
    over_a_day = Status.objects.filter(date_created__lte=threshold_datetime)
    over_a_day.delete()
    if user.is_authenticated:
        statuslength= 0
        status_exist = False
        all_statuses = []
        request_user_status = []
        friends = []
        personalpost=Post.objects.filter(author=request.user)
        personalpost = Post.objects.filter(author=request.user)
        friend = request.user.profile.friends.all()

        for i in friend:
            ts=Post.objects.filter(author=i.id)
            
            if ts.exists():
                personalpost= personalpost.union(ts)
            
            # getting status for each friend of the user
            friend_status =Status.objects.filter(author=i.id).order_by('-date_created')
            
            if friend_status.exists:
                status = []
                for z in friend_status:
                    if z.file and z.author.cover_photo:
                        details= {
                            "text":z.text,
                            "file":z.file.url,
                            "owner":z.author.prof_pics.url,
                            "cover_photo": request.build_absolute_uri(z.author.cover_photo)
                        }
                    elif z.file and not z.author.cover_photo:
                        details= {
                            "text":z.text,
                            "owner":z.author.prof_pics.url,
                            "file":z.file.url,
                        }
                    elif not z.file and not z.author.cover_photo:
                        details= {
                            "text":z.text,
                            "owner":z.author.prof_pics.url
                        }
                    elif not z.file and z.author.cover_photo:
                        details= {
                            "text":z.text,
                            "owner":z.author.prof_pics.url,
                            "cover_photo": request.build_absolute_uri(z.author.cover_photo)
                        } 
                    
                    status.append(details)
                all_statuses.append(status)
        owner_status = Status.objects.filter(author=request.user.id).order_by('-date_created')

        if owner_status.exists():
            for a in owner_status:
                if a.file and a.author.cover_photo:
                    detail= {
                        "text":a.text,
                        "file":a.file.url,
                        "owner":a.author.prof_pics.url,
                        "cover_photo": request.build_absolute_uri(a.author.cover_photo)
                    }
                elif a.file and not a.author.cover_photo:
                     detail= {
                        "text":a.text,
                        "owner":a.author.prof_pics.url,
                        "file":a.file.url,
                    }
                elif not a.file and not a.author.cover_photo:
                    detail= {
                        "text":a.text,
                        "owner":a.author.prof_pics.url
                    }           
                elif not a.file and a.author.cover_photo:
                    detail= {
                        "text":a.text,
                        "owner":a.author.prof_pics.url,
                        "cover_photo": request.build_absolute_uri(a.author.cover_photo)

                    }           
                
                request_user_status.append(detail)

            statuslength= len(status)
            all_statuses.append(request_user_status)
        print(statuslength, len(request_user_status))
        print(type(statuslength), "len(request_user_status)")

        if statuslength < 1 and len(request_user_status) < 1:
            status_exist = False
        elif statuslength > 0 and len(request_user_status) < 1:
            status_exist = True
        elif statuslength < 1 and len(request_user_status) > 0:
            status_exist = True
        elif statuslength > 0 or len(request_user_status) > 0:
            status_exist = True
        
        personalposting = personalpost.reverse()
        context = {"tweets": personalposting, "status":all_statuses, "friends_id":friends, "statusexist":status_exist  }
    else:
        return redirect("login")
    template_names=["hometweet/home.html", "hometweet/status.html",]
    return render(request, template_names, context)




@login_required(login_url="login")
def personalInitialMessages(request, receiver):
    sender=Profile.objects.get(user=request.user)
    group_name=sender.user.username+receiver
    reversed_string = group_name[::-1]
    uniqueId = Message.objects.get(Q(uniqueId__icontains=group_name) | Q(uniqueId__icontains=reversed_string))
    return JsonResponse({"context":uniqueId.content}) 

    # return render(request, "profiles/try.html", {'online_users': "users"})


# def chat(request, room_name):
#     return JsonResponse({"context":"context"}) 