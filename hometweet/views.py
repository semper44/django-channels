from django.shortcuts import render
from .models import Post, Coment,Notification
from .forms import make_tweet_form, Reply_form, Comment_form, make_status_form
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group
from django.http import JsonResponse
from user.models import CustomUser
import os


# Create your views here.

# @login_required(login_url="login")
# def home_view(request):
#     user = request.user
#     previousMessagefiltered = Message.objects.filter(uniqueId__icontains="ppkk")
#     print(previousMessagefiltered)

#     if user.is_authenticated:
#         tweets =  None
#         status =  None
#         status_state=False
#         tweets_state=False        
#         friends = []
#         try:
#             profiles = Profile.objects.get(user = user)
#             friend = profiles.friends.all()
#             # print(vars(profiles))
#             tweets =  Post.objects.all()
#             status =  Status.objects.all()
#             for i in friend:
#                 if tweets_state==False: 
#                     ts=Post.objects.filter(author=i.id)
#                     if ts.exists()==True:
#                         tweets_state=True
#                 if status_state==False: 
#                     ss=Status.objects.filter(author=i.id)
#                     if ss.exists()==True:
#                         status_state=True
#                 friends.append(i.id)
#             # print(tweets.content)
#         except:
#             noProfile="You have no profile"
#         context = {"tweets": tweets, "status":status, "friends_id":friends, "tweets_state":tweets_state, "status_state":status_state }
#     else:
#         return redirect("login")
#     template_names=["hometweet/home.html", "hometweet/status.html",]
#     return render(request, template_names, context)

def try_view(request):
    return render(request, "hometweet/try.html", {})


@login_required(login_url="login")
def create_post_view(request):
    if request.method == 'POST':
        print(request.POST)
        if request.POST["content"]or request.FILES["file"]:
            form = make_tweet_form(request.POST, request.FILES)
            if form.is_valid():
                # Create a new post
                post = form.save(commit=False)
                profile= CustomUser.objects.get(username=request.user.username )
                post.author = profile # Assuming you have a user associated with the post
                post.save()
                return JsonResponse({"success": True})
            print(form.errors)
            return JsonResponse({"success": False, "errors": form.errors})
        return JsonResponse({"success": False, "errors": "empty"})
    

@login_required(login_url="login")
def create_status_view(request):
    if request.method == 'POST':
        if request.POST["text"] or request.FILES["file"]:
            form = make_status_form(request.POST, request.FILES)
            if form.is_valid():
                # Create a new post
                post = form.save(commit=False)
                profile= CustomUser.objects.get(username=request.user.username )
                post.author = profile # Assuming you have a user associated with the post
                post.save()
                return JsonResponse({"success": True})
            print(form.errors)
            return JsonResponse({"success": False, "errors": form.errors})
        return JsonResponse({"success": False, "errors": "empty"})


def base_view(request):
    return(request, "base.html", {""})



def like_post(request):
    if request.method == "POST":
        post_id = request.POST.get("post_id")
        post = Post.objects.get(id=post_id)
        k=post.likes.all()
        if not post.likes.filter(id=request.user.id).exists():
            # receiver= None
            post.likes.add(request.user)
            like_count= post.likes.count()
            if request.user != post.author:
                receiver= post.author
            else:
                receiver= request.user
            response_data = {"success": "true", "like_count":like_count, "status": "like", "receiver":receiver.username}
            return JsonResponse(response_data)
        else:
            post.likes.remove(request.user)
        
            like_count= post.likes.count()

        

            response_data = {"success": "true", "like_count":like_count, "stat": "unlike" }
            return JsonResponse(response_data)
    else:
        return JsonResponse({"error": "Invalid request"})



def notification_view(request):
    notification= Notification.objects.filter(receiver= request.user)
    # for i in notification:
    #     print(i)
    return render(request, "hometweet/notifications.html", {"notification": notification})


# def handle_uploaded_file(file):
#     # Get the base directory of your Django project
#     base_directory = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

#     # Define the relative path to the "images" subfolder within the "media" folder
#     relative_path = 'media/images/'

#     # Construct the absolute path by joining the base directory and the relative path
#     absolute_path = os.path.join(base_directory, relative_path)

#     # Create the directory if it doesn't exist
#     os.makedirs(absolute_path, exist_ok=True)

#     # Define the file path within the "images" subfolder
#     file_path = os.path.join(absolute_path, file.name)

#     # Open the destination file in write binary mode
#     with open(file_path, 'wb') as destination:
#         # Iterate over chunks to prevent memory issues
#         for chunk in file.chunks():
#             destination.write(chunk)

#     return file_path


@login_required(login_url="login")
def comment_view(request, slug):
    post= Post.objects.get(slug=slug)
    comment_arr=[]
    comments= Coment.objects.filter(comment_post=post)
    for i in comments:
        try:
            group= Group.objects.get(name= f"{i.comment_author.username}group")
            if request.user in group.user_set.all():
                print(True)
                continue
        except:
            comment_arr.append(i)
    context={"post":post, "comments":comment_arr}
    return render(request, "hometweet/comment.html", context)

@login_required(login_url="login")
def save_comment_view(request, post_slug):
    post = get_object_or_404(Post, slug=post_slug)  
    if request.method == "POST":
        comment_text = request.POST.get("comments")
        comment_pics = request.POST.get("comment_pics")
        data=request.POST.copy()
        data.update({'comment_author': request.user, 'comment_post':post})
        if comment_pics is not None:
            data["comment_pics"]=comment_pics
        request.POST=data
        comment_form = Comment_form(request.POST, request.FILES)
        if comment_form.is_valid():
            comment = comment_form.save(commit=False)
            # comment.comment_author = request.user
            comment.comment_post = post
            comment.comments = comment_text
            comment.save()
            return JsonResponse({"success": True})
        else:
            print("Form Data:", request.POST)
            print("Form Errors:", comment_form.errors)
            return JsonResponse({"success": False, "errors": comment_form.errors})
    else:
        comment_form = Comment_form()
    
    return JsonResponse({"comment_form": comment_form})

@login_required(login_url="login")
def save_reply_view(request, comment_id):
    if request.method == "POST":
        reply_text = request.POST.get("reply_text")
        reply_pics = request.POST.get("reply_pics")
        data=request.POST.copy()
        data.update({'reply_author': request.user,'reply':reply_text, comment_id:comment_id})
        if reply_pics is not None:
            data['reply_pics']=reply_pics
        request.POST=data
        reply_form = Reply_form(request.POST, request.FILES)
        if reply_form.is_valid():
            reply_form.save()
            return JsonResponse({"success": True})
        else:
            print("Form Data:", request.POST)
            print("Form Errors:", reply_form.errors)
            return JsonResponse({"success": False, "errors": reply_form.errors})
    else:
        reply_form = Reply_form()
    
    return JsonResponse({"comment_form": reply_form})


@login_required(login_url="login")
def reply_view(request, comment_id):
    reply_arr=[]
    comment= Coment.objects.get(id=comment_id)
    # comments= Coment.objects.filter(comment_post=post)
    print(comment.replies.all())
    if comment:
        for i in  comment.replies.all():
            group= Group.objects.get(name= f"{i.reply_author.username}group")
            if i.reply_author in group.user_set.all():
                continue
            else:
                details={"reply":i.reply, "reply_author":i.reply_author.username, "prof_pics":i.reply_author.prof_pics.url}
                if i.reply_pics:
                    details["reply_pics"]=i.reply_pics.url
                reply_arr.append(details)
    else:
        print("no")
    
    print(reply_arr)
    context = {"replies": reply_arr}
    return JsonResponse(context)