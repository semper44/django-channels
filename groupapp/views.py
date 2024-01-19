from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .forms import Users_Group_Post_form, Users_create_Group_form, Reply_form, Comment_form
from django.contrib.auth.models import  Group
from .models import UserGroups, Group_coment, UserGroups_Post
from user.models import CustomUser
from django.db.models import Q
from itertools import chain
from django.core.serializers import serialize

from django.shortcuts import get_object_or_404
from django.core import serializers
from .forms import GroupcoverpictureInput
# from django.conf import settings




# Create your views here.

@login_required(login_url="login")
def create_group(request):
    if request.method=="POST":
        details= request.POST.copy()
        details["members"]= request.user
        details["owner"]= request.user
        print(request.FILES)
        forms=Users_create_Group_form(details, request.FILES)
        if forms.is_valid():
            print(":validd")
            forms.save()
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"success": False, "errors": forms.errors})
    # else:
    #     forms=Users_create_Group_form()
    
# @login_required(login_url="login")
# def list_groups(request):
#     groups= UserGroups.objects.all()
  
#     data=serializers.serialize('json', groups)
#     return JsonResponse(data, safe=False)

@login_required
# @require_http_methods(["PATCH"])
def change_group_cover_picture(request, name):
    if request.method == "POST":
        group =  UserGroups.objects.get(name= name)
        form = GroupcoverpictureInput(request.POST, request.FILES, instance=group)
        if form.is_valid():
            form.instance.cover_photo = form.cleaned_data['cover_photo']
            form.save()
            return JsonResponse({'success': "true"}) # Replace 'profile' with the URL name of the user's profile page
    else:
        print("name")
        form = GroupcoverpictureInput()   
        return JsonResponse({'success': "false"})



@login_required(login_url="login")
def post_on_group(request, name):
    if request.method=="POST":
        try:
            owner = False
            if request.POST["text"] or request.FILES["file"]:
                blocked= Group.objects.filter(name= f"{name}blocked")
                usergroup= UserGroups.objects.get(name=name)
                if request.user not in blocked:
                    details= request.POST.copy()
                    details["usergroups"]= usergroup
                    if request.user == usergroup.owner:
                        details["status"]= "accept"
                        owner = True
                    else:
                        details["status"]= "send"
                    details["author"]= request.user
                    request.POST= details
                    form = Users_Group_Post_form(request.POST, request.FILES)
                    if form.is_valid():
                        post = form.save(commit=False)
                        profile= CustomUser.objects.get(username=request.user.username )
                        post.author = profile # Assuming you have a user associated with the post
                        post.save()
                        success= None
                        if owner:
                            return JsonResponse({"success": True}, status=201)
                        else:
                            return JsonResponse({"success": True})
                    
                    else:
                        print(form.errors)
                        return JsonResponse({"success": False, "errors": form.errors})
                
        except Exception as e:
            print(f'Exception: {e}')
            return JsonResponse({"success": False},staus=400 )

        # text =  request.POST.get('text')
                # file =  request.FILES.get('file')
                    
            
            
                
        #         if text and file:
        #             print('all')
        #             post_form=Users_Group_Post_form(request.POST, request.FILES)
        #         elif not text and file:
        #             print('file')
        #             post_form=Users_Group_Post_form(request.FILES)
        #         elif text and not file:
        #             print('text')
        #             post_form=Users_Group_Post_form(request.POST)
        #         if post_form.is_valid():
        #             post_form.save()
        #             success=True
        #         print(post_form.errors)
        #     else:
        #         success=False
        #     return JsonResponse({"status":success})
        # 


@login_required(login_url="login")
def join_group(request, id):
    group= UserGroups.objects.get(id= id)
    name= group.name
    blocked=  Group.objects.filter(name= f"{group.name}blocked")
    if request.user not in blocked:
        group.members.add(request.user)
        success=True

    else:
        success=False
    return redirect(f"/group-view/{name}")

@login_required(login_url="login")
def exit_group(request, id):
    group= UserGroups.objects.get(id= id)
    request.user.groups.delete(group)
    return redirect("/")

@login_required(login_url="login")
def make_admin(request, userid, groupname):
    # if request.user === 
    group= Group.objects.get(name= f"{groupname}admin")
    user=CustomUser.objects.get(id= userid)
    user.groups.add(group)
    return redirect(f"/group-view/{groupname}/")


@login_required(login_url="login")
def list_all_groups(request):
    groups= UserGroups.objects.all()
    return render(request, "groups/allgroups.html", {"groups": groups})

@login_required(login_url="login")
def list_all_groups_json(request):
    groups = UserGroups.objects.all()

    # Check if there are any groups
    if groups.exists():
        # Serialize the groups data if they exist
        serialized_groups = serialize('json', groups)
        return JsonResponse(serialized_groups, safe=False)
    else:
        # Return an empty JSON array if no groups exist
        return JsonResponse([], safe=False)

@login_required(login_url="login")
def delete_user_from_group(request, userid, groupid):
    group= UserGroups.objects.get(id= groupid)
    name= group.name
    admin= Group.objects.filter(name= f"{group.name}admin")
    if request.user in admin or request.user== group.owner:
        user=CustomUser.objects.get(id= userid)
        group.members.remove(user)
        success=True
    else:
        success=False
    return redirect(f"/group-view/{name}/")

@login_required(login_url="login")
def owner_delete_group(request, groupid):
    group= UserGroups.objects.get(id= groupid)
    print("concern")
    if request.user== group.owner:
        print("hmm")
        group.delete()
        print("good")
    return redirect('/')

@login_required(login_url="login")
def delete_group_post(request, groupid, postid):
    group= UserGroups.objects.get(id= groupid)
    admin= Group.objects.filter(name= f"{group.name}admin")
    allgrouppost=UserGroups_Post.objects.filter(usergroups=group)
    if request.user in admin or request.user== group.owner:
        post=UserGroups_Post.objects.get(id=postid)
        post.delete()
        print("good")
        return JsonResponse({"success": "true", 'post_length': len(allgrouppost)})
    return JsonResponse({"success": "false"})


def group_like_post(request):
    if request.method == "POST":
        print("fret")
        post_id = request.POST.get("post_id")
        print(request.POST)
        post = UserGroups_Post.objects.get(id=post_id)
        print(post)
        k=post.like.all()
        print(request.user in k)
        if not post.like.filter(id=request.user.id).exists():
            # receiver= None
            post.like.add(request.user)
            like_count= post.like.count()
            if request.user != post.author:
                receiver= post.author
            else:
                receiver= request.user
            response_data = {"success": "true", "like_count":like_count, "status": "like", "receiver":receiver.username}
            return JsonResponse(response_data)
        else:
            post.like.remove(request.user)
        
            like_count= post.like.count()

            response_data = {"success": "true", "like_count":like_count, "stat": "unlike" }
            return JsonResponse(response_data)
    else:
        return JsonResponse({"error": "Invalid request"})


@login_required(login_url="login")
def group_view(request, name):
    group= UserGroups.objects.get(name= name)
    perm= None
    blocked=False
    post=False
    draft=False
    if request.user.groups.filter(name= f"{name}admin").exists():
        perm=True
    else:
        perm=False
    print(perm)
    print("perm")
    print(UserGroups_Post.objects.filter(usergroups=group, status="accept"))
    if Group.objects.get(name= f"{name}blocked").DoesNotExist():
        try:
            post= UserGroups_Post.objects.filter(usergroups=group, status="accept")
        except:
            post=False
        try:
            if request.user == group.owner or perm :
                print("pass")
                draft= UserGroups_Post.objects.filter(usergroups=group, status="send")
        except:
            draft=False
    else:
        blocked=True

    context={"post":post, "blocked":blocked, "group":group, "drafts":draft, "admin":perm}
    return render(request, "groups/groups.html", context)


@login_required(login_url="login")
def group_search(request, id):
    if "query" in request.GET:
        # groups= UserGroups.objects.get(name = queries)
        queries = request.GET.get("query")
        members = UserGroups.objects.filter(members__icontains = queries, id=id)
        posts = UserGroups_Post.objects.filter(Q(text = queries, id=id, status="accept") | Q(file= queries, id=id, status="accept"))
        results= chain(members, posts)

    data=serializers.serialize('json', results)
    return JsonResponse(data, safe=False)


@login_required(login_url="login")
def approve_post(request, groupid, postid):
    group= UserGroups.objects.get(id= groupid)
    admin= Group.objects.filter(name= f"{group.name}admin")
    if request.user in admin or request.user== group.owner:
        user=UserGroups_Post.objects.get(id= postid)
        user.status="accept"
        user.save(update_fields=["status"])
        success=True
    else:
        success=False
    return JsonResponse({"success": success})

@login_required(login_url="login")
def comment_view(request, slug):
    post= UserGroups_Post.objects.get(slug=slug)
    group= Group.objects.get(name= f"{post.usergroups.name}blocked")
    if request.user not in group.user_set.all():
        comment_arr=[]
        comments= Group_coment.objects.filter(comment_post=post)
        for i in comments:
            print(i)
            comment_arr.append(i)
        context={"grouppost":post, "groupcomments":comment_arr}
    return render(request, "groups/groupcomments.html", context)

@login_required(login_url="login")
def save_comment_view(request, post_slug):
    post = get_object_or_404(UserGroups_Post, slug=post_slug)  
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
            print("check2")
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


def tryview(request):
    return render(request, )

@login_required(login_url="login")
def reply_view(request, comment_id):
    reply_arr=[]
    comment= Group_coment.objects.get(id=comment_id)
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