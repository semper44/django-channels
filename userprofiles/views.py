from django.shortcuts import redirect, render
from .models import Profile, Relationship
from .forms import register_form, ProfilePictureForm  # Create this form in forms.py
from django.conf import settings
from django.contrib.auth import authenticate, login,logout
from hometweet.models import Post
from django.http import JsonResponse
from django.contrib.auth.models import Group
from django.db.models import Q
from django.contrib.auth.decorators import login_required
from user.models import CustomUser
from itertools import zip_longest
from groupapp.models import UserGroups, UserGroups_Post
from django.core import serializers
from django.contrib import messages
# from datetime import datetime

# from django.utils import timezone
# from chat.models import Message
# from guardian.shortcuts import assign_perm,get_group_perms


# abigails code

def register_view(request):
    context={}
    print(request.method)
    if request.method=="POST":
        print(request.POST)
        form = register_form(request.POST or None)
        if form.is_valid():
            form.save()
            messages.success(request, "Registration successful")
            return redirect("login")
        else:
            messages.error(request, form.errors)
            print(form.errors)
            return redirect("register")
    else:
        form = register_form()
        context["form"] =  form
    return render(request, "profiles/register.html", context)

def login_view(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        print(email, password)
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect("home")
        else:
            messages.error(request, "Password or email incorrect")
            return redirect("login")
    return render(request, "profiles/login.html", {})

def logout_view(request):
    offlinemessageNotification= 0
    notifTotal= 0
    if request.POST.get("offlineNotification") != "null":
        notifTotal= request.POST.get("offlineNotification")

    if request.POST.get("offlinemessageNotification") != "null":
        offlinemessageNotification= request.POST.get("offlinemessageNotification")
    
    user= CustomUser.objects.get(username= request.user.username)
    if int(notifTotal)>0:
        user.logout_notification=notifTotal
        user.save(update_fields=["logout_notification"])
    
    if int(offlinemessageNotification)>0:
        user.logout_message_notification=offlinemessageNotification
        user.save(update_fields=["logout_message_notification"])
    logout(request)
    return JsonResponse("success", safe=False)

'''view friends tweet view'''
@login_required(login_url="login")
def profile_view(request, name):
    same_person=False
    context=None
    friends_length= 0

    profi = Profile.objects.get(user=request.user)
    try:
        group= Group.objects.get(name= f"{name}group")
        if request.user in group.user_set.all():
            context={"blocked":True}
            
    except:
        try:
            user = CustomUser.objects.get(username=name)           
            profiles = Profile.objects.get(user=user)
            groups= UserGroups.objects.filter(members= user)
            # user = CustomUser.objects.select_related('profile', 'usergroups').get(username=name)
            # profiles = user.profile
            # groups = user.usergroups.all()
            friend = profiles.friends.all()
            if friend.exists():
                friends_exists=True
            else:
                friends_exists=False

            friends_length=len(friend)
            if request.user.id == user.id:
                same_person=True
            posts = Post.objects.filter(author_id= profiles.id)
            
            context = {"posts":posts,"friends_exists":friends_exists, 
               "friends":friend, "same_person":same_person,
               "not_sameperson_id": user.username, 
               "profiles":profiles,
               "len_posts":len(posts),
               "user": request.user,
               "blocked":False,
               "friends_length":friends_length,
               "groups":groups,
               "URL_KEY": settings.URL_KEY
        }
        except:
            context= {"notfound": "No profile found"}
    return render(request, "profiles/profiles.html", context)


def delete_user_post(request, postid):
    try:
        post=Post.objects.get(id=postid)
        post.delete()
        print("good")
        return JsonResponse({"success": "true"})
    except:
        print("bad")
        return JsonResponse({"success": "false"})




@login_required
def change_profile_picture(request):
    if request.method == 'POST':
        form = ProfilePictureForm(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            form.save()
            return JsonResponse({'success': "true"}) # Replace 'profile' with the URL name of the user's profile page
    else:
        form = ProfilePictureForm(instance=request.user)   
        return JsonResponse({'success': "false"})


def reset_notif(request):
    dbnotif= CustomUser.objects.get(username= request.user.username)
    dbnotif.notifications=0
    dbnotif.message_notif=0
    dbnotif.logout_notification=0
    dbnotif.logout_message_notification=0

    dbnotif.save(update_fields=["notifications", "message_notif", "logout_notification", "logout_message_notification"])
    print("dbnotif.is_notification_seen")    
    return JsonResponse("true", safe=False)

'''find friends list'''
@login_required(login_url="login")
def find_friends(request):
    all_profiles = CustomUser.objects.exclude(username = request.user.username)
    user = Profile.objects.get(user = request.user)
    dbnotif= CustomUser.objects.get(username= request.user.username)
    notif= dbnotif.notifications
    message_notif= dbnotif.message_notif
    logout_notification= dbnotif.logout_notification
    logout_message_notification= dbnotif.logout_message_notification
    user_friends = user.friends.all()
    sent_request = Relationship.objects.filter(sender=user, status="send") 
    received_request = Relationship.objects.filter( receiver= user, status="send") 

    user_profiles_arr=[]
    received_arr=set()
    sent_arr=set()
    findfriend_list = []
    
    for p in user_friends:
        user_profiles_arr.append(p.username)

    for i in all_profiles:    
        if i.username in user_profiles_arr:
            # print(p.username)
            continue
        else:
            findfriend_list.append({
                # "pics":str(request.build_absolute_uri(p.prof_pics)),
                "pics":i.prof_pics.url,
                "username":i.username,
                "cover":request.build_absolute_uri(i.cover_photo),
                "bio":i.bio,
                "notif":notif,
                "message_notif":message_notif,
                "logout_notification":logout_notification,
                "logout_message_notification":logout_message_notification
            })

        for sent, received in zip_longest(received_request, sent_request):
            if sent is not None:
                sent_arr.add(sent.sender.user.username)

            if received is not None:
                received_arr.add(received.receiver.user.username)
    context = {
        "find_friends": findfriend_list,
        "sent": list(sent_arr),
        "received": list(received_arr),
        "URL_KEY": settings.URL_KEY

    }
    return JsonResponse(context)

@login_required(login_url="login")
def find_friends_templates(request):
    all_profiles = CustomUser.objects.exclude(username = request.user.username)
    user = Profile.objects.get(user = request.user)
    user_friends = user.friends.all()
    sent_request = Relationship.objects.filter(sender=user, status="send") 
    received_request = Relationship.objects.filter( receiver= user, status="send") 

    user_profiles_arr=[]
    received_arr=set()
    sent_arr=set()
    findfriend_list = []
    
    for p in user_friends:
        user_profiles_arr.append(p.username)

    for x in all_profiles:    
        if x.username in user_profiles_arr:
            # print(p.username)
            continue
        else:
            findfriend_list.append({
                # "pics":str(request.build_absolute_uri(p.prof_pics)),
                "pics":x.prof_pics.url,
                "username":x.username,
                "cover":request.build_absolute_uri(x.cover_photo),
                "bio":x.bio,
            })

        for sent, received in zip_longest(received_request, sent_request):
            if sent is not None:
                sent_arr.add(sent.sender.user.username)

            if received is not None:
                received_arr.add(received.receiver.user.username)
        # print(received_arr)
    context = {
        "find_friends": findfriend_list,
        "sent": list(sent_arr),
        "received": list(received_arr)

    }
    return render(request, "profiles/findfriends.html", context)


@login_required(login_url="login")
def remove_friend_view(request, friend):
    if request.method == "POST":
        user = request.user
        print("friend")
        print(friend)
        print(user.id)
        receiverUser= CustomUser.objects.get(username= friend)
        receiver=Profile.objects.get(user = receiverUser)
        senderUser= CustomUser.objects.get(username= user.username)
        sender =Profile.objects.get(user = senderUser)
        rel = Relationship.objects.get(Q(sender=receiver, receiver= sender, status="accept") | Q(sender=sender, receiver=receiver, status="accept")) 
        rel.delete()
        sender.friends.remove(receiverUser)
        receiver.friends.remove(senderUser)
        print(rel)
    context = {"delete": "delete" }
    return JsonResponse(context)


@login_required(login_url="login")
def add_friend_view(request, friend):
    # if "add" in request.POST:
    if request.method == "POST":
        user = request.user
        friendUser= CustomUser.objects.get(username= friend)
        friend = Profile.objects.get(user= user)
        profiles = Profile.objects.get(user=friendUser)
        # profiles = friend.friends.get(id=id)
        print(profiles)
        print(friend)
        Relationship.objects.create(sender = friend, receiver = profiles, status = "send")
    context = {"success": "ok" }
    return JsonResponse(context)

@login_required(login_url="login")
def view_sent_request(request):
    user = request.user
    prof =  Profile.objects.get(user = user)
    sent_request = Relationship.objects.filter(status ="send", sender= prof)
    context= {"sent_request":sent_request}
    return render(request,"profiles/removefriends.html", context)

@login_required(login_url="login")
def accept_sent_request(request, rid):
    if request.method=="POST":
        relationship= Relationship.objects.get(id= rid)
        relationship.status="accept"
        relationship.save(update_fields=["status"])
        return JsonResponse({"success": "ok" })

    context = {"success": "false"  }
    return JsonResponse(context)

@login_required(login_url="login")
def decline_sent_request(request, id):
    if request.method == "POST":
        user = request.user
        print(user.id)
        sender_= CustomUser.objects.get(id= id)
        sender=Profile.objects.get(user = user)
        receiver =Profile.objects.get(user = sender_)
        
        rel = Relationship.objects.get(Q(sender=receiver, receiver= sender, status="send") | Q(sender=sender, receiver=receiver, status="send"))
    
        print(rel)
        rel.delete()
        return JsonResponse({"success": "ok" })
    context = {"success": "false" }
    return JsonResponse(context)


@login_required(login_url="login")
def view_received_request(request):
    arr=[]
    user = request.user 
    prof =  Profile.objects.get(user = user)
    received_request = Relationship.objects.filter(status ="send", receiver= prof)
    for i in received_request:
        print(i.id)
        sender_profile= CustomUser.objects.get(profile=i.sender)
        details={"pics":sender_profile.prof_pics.url,"name":sender_profile.username, "sender":sender_profile.id, "bio":sender_profile.bio, "relId":i.id}
        # print(i.receiver.user)
        arr.append(details)
        print(sender_profile.prof_pics)
        # print(vars(i))
    print(received_request)
    context= {"received_request":arr}
    return JsonResponse(context)


# @login_required(login_url="login")
# def block_user_view(request, id):
#     if request.method == "POST":
#        grouped = Group.objects.get(name="blockedusers")
#        friend = Profile.objects.get(id = id)
#        print(friend)
#        friend.group.add(grouped)
#        friend.has_perm()

#     return render(request, "profiles/blockuser.html", {})

@login_required(login_url="login")
def search_view(request):
    if "query" in request.GET:
        queries = request.GET.get("query")
        prof_arr=[]
        group_arr=[]
        post_arr=[]
        group_post_arr=[]
        profile = CustomUser.objects.filter(username__icontains = queries)
        for i in profile:
            print(i.username)
            try:
                group= Group.objects.get(name= f"{i.username}group")
                if request.user in group.user_set.all():
                    continue
                else:
                    details={"username":i.username, "prof_pics":i.prof_pics.url, "bio":i.bio, "cover": i.cover_photo.url}
                    prof_arr.append(details)
            except:
                print("tr")
                details={"username":i.username, "prof_pics":i.prof_pics.url, "bio":i.bio, "cover": i.cover_photo.url}
                prof_arr.append(details)
                

        posts = Post.objects.filter(content__icontains = queries)
        for x in posts:
            print(posts)
            try:
                group= Group.objects.get(name= f"{x.author.username}group")
                if request.user in group.user_set.all():
                    continue
                else:
                    details={"content":x.content,  "slug":x.slug}
                    post_arr.append(details)
            except:
                
                details={"content":x.content, "owner":x.author.username, "prof_pics":x.author.prof_pics.url, "date":x.date_created.strftime("%a at %H:%M"), "slug":x.slug}
                post_arr.append(details)

        groups = UserGroups.objects.filter(name__icontains = queries)
        print(groups)
        for x in groups:
            try:
                group= Group.objects.get(name= f"{x.name}blocked")
                if request.user in group.user_set.all():
                    continue
                else:
                    group_post= UserGroups_Post.objects.filter(text__icontains = queries, usergroups=x.name)

                    if x.cover_photo:
                        details={"name":x.name, "photo":x.cover_photo.url, "description":x.description,}
                        group_arr.append(details)
                    else:
                        details={"name":x.name}
                        group_arr.append(details)

            except:
                print("cover_photo1")

                if x.cover_photo:
                    print("cover_photo2")
                    details={"name":x.name, "photo":x.cover_photo.url}
                    group_arr.append(details)
                else:
                    print("cover_photo3")
                    details={"name":x.name}
                    group_arr.append(details)           
                    print(prof_arr)

        group_post= UserGroups_Post.objects.filter(text__icontains = queries)
        for x in group_post:
            try:
                group= Group.objects.get(name= f"{x.usergroups.name}blocked")
                if request.user in group.user_set.all():
                    continue
                else:
                    if x.file:
                        details={"text":x.text, "photo":x.file.url, }
                        group_post_arr.append(details)
                    else:
                        details={"text":x.text}
                        group_post_arr.append(details)

            except:
                print("cover_photo1")

                if x.file:
                    details={"text":x.text, "photo":x.file.url, }
                    group_post_arr.append(details)
                else:
                    details={"text":x.text}
                    group_post_arr.append(details)
        
        results= post_arr+prof_arr+group_arr+group_post_arr
        context = {"results":results, "URL_KEY": settings.URL_KEY}  
        return JsonResponse(context)
    else:
        results = Profile.objects.all().none

        context = {"results":results, "URL_KEY": settings.URL_KEY}        
        return JsonResponse(context)
    
@login_required(login_url="login")
def search_view_template(request):
    if "query" in request.GET:
        queries = request.GET.get("query")
        print(":query")
        prof_arr=[]
        group_arr=[]
        post_arr=[]
        group_post_arr=[]
        profile = CustomUser.objects.filter(username__icontains = queries)
        for i in profile:
            print(i.username)
            try:
                group= Group.objects.get(name= f"{i.username}group")
                if request.user in group.user_set.all():
                    continue
                else:
                    details={"username":i.username, "prof_pics":i.prof_pics.url, "bio":i.bio, "cover": i.cover_photo.url}
                    prof_arr.append(details)
            except:
                print("tr")
                details={"username":i.username, "prof_pics":i.prof_pics.url, "bio":i.bio, "cover": i.cover_photo.url}
                prof_arr.append(details)
                

        posts = Post.objects.filter(content__icontains = queries)
        for x in posts:
            print(posts)
            try:
                group= Group.objects.get(name= f"{x.author.username}group")
                if request.user in group.user_set.all():
                    continue
                else:
                    details={"content":x.content,  "slug":x.slug}
                    post_arr.append(details)
            except:
                
                details={"content":x.content, "owner":x.author.username, "prof_pics":x.author.prof_pics.url, "date":x.date_created.strftime("%a at %H:%M"), "slug":x.slug}
                post_arr.append(details)

        groups = UserGroups.objects.filter(name__icontains = queries)
        print(groups)
        for x in groups:
            try:
                group= Group.objects.get(name= f"{x.name}blocked")
                if request.user in group.user_set.all():
                    continue
                else:
                    if x.cover_photo:
                        details={"name":x.name, "photo":x.cover_photo.url, "description":x.description,}
                        group_arr.append(details)
                    else:
                        details={"name":x.name}
                        group_arr.append(details)

            except:
                print("cover_photo1")

                if x.cover_photo:
                    print("cover_photo2")
                    details={"name":x.name, "photo":x.cover_photo.url}
                    group_arr.append(details)
                else:
                    print("cover_photo3")
                    details={"name":x.name}
                    group_arr.append(details)           
                    print(prof_arr)
        
        group_post= UserGroups_Post.objects.filter(text__icontains = queries)
        for x in group_post:
            try:
                group= Group.objects.get(name= f"{x.usergroups.name}blocked")
                if request.user in group.user_set.all():
                    continue
                else:
                    if x.cover_photo:
                        details={"text":x.text, "photo":x.file.url, }
                        group_post_arr.append(details)
                    else:
                        details={"text":x.text}
                        group_post_arr.append(details)
            except:
                if x.cover_photo:
                    details={"text":x.text, "photo":x.file.url, }
                    group_post_arr.append(details)
                else:
                    details={"text":x.text}
                    group_post_arr.append(details)

        results= post_arr+prof_arr+group_arr+group_post_arr
        context = {"post_arr":post_arr,"prof_arr": prof_arr, "group_arr": group_arr,"group_post_arr": group_post_arr }  
    else:
        print(":nooooquery")
        context = {"results":"results"}        
    return render(request, "hometweet/search.html", context)
    


@login_required(login_url="login")
def group_search_view(request):
    print(request.GET)
    if "query" in request.GET:
        queries = request.GET.get("query")
        group_post= UserGroups_Post.objects.filter(text_icontains= queries)
        data= serializers.serialize('json', group_post )
        context = {"results":group_post}  
        return JsonResponse(data, safe=False)
    else:
        context = {"results":"results"}        
        return JsonResponse(context)

@login_required(login_url="login")
def block_user_view(request, username):
    if request.method == "POST":
       group, created = Group.objects.get_or_create(name=f"{request.user}group")
       friend = CustomUser.objects.get(username = username)
       friend.group.add(group)
    return JsonResponse("success")

@login_required(login_url="login")
def unblock_user_view(request, username):
    if request.method == "POST":
        try:
            group, created = Group.objects.get(name=f"{request.user}group")
            friend = CustomUser.objects.get(username = username)
            friend.group.remove(group)
        except:
            pass
    return JsonResponse("success")
