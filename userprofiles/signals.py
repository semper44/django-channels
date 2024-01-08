from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, Relationship
# from groupapp.models import Groupapp
from django.contrib.auth.models import Group
from user.models import CustomUser




# User=get_user_model()
# print(User)

@receiver(post_save, sender=CustomUser)
def profile_create(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        

@receiver(post_save, sender=Relationship)
def add_friends(sender, instance, created, **kwargs): 
    sender_ = instance.sender
    receiver_ = instance.receiver
    eg = instance
    if instance.status == "accept":
        print(eg)
        # print("hy")
        sender_.friends.add(receiver_.user)
        receiver_.friends.add(sender_.user)
        sender_.save()
        receiver_.save()

# @receiver(post_save, sender=Relationship)
# def delete_friends(sender, instance, **kwargs):
#     user = Profile.objects.all()
#     user.friends.delete(user=instance)





