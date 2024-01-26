from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import Group
from user.models import CustomUser
from .models import UserGroups_Post, UserGroups

# @receiver(post_save, sender=UserGroups_Post)
# def add_friends(sender, instance, created, **kwargs): 
#     # sender_ = instance.sender
#     # receiver_ = instance.receiver
#     if instance.status == "accept":
#         user_group_relations=UserGroups_Relationship.objects.create(usergroups=instance.usergroups, usergroupspost=instance.usergroupspost) 
#         user_group_relations.save()

@receiver(post_save, sender=UserGroups)
def create_groups(sender, instance, created, **kwargs): 
    # receiver_ = instance.receiver
    if created:
        sender= instance.name
        groupadmin=Group.objects.create(name=f"{sender}admin")
        groupblocked=Group.objects.create(name=f"{sender}blocked")
        groupblocked.save()
        groupadmin.save()
