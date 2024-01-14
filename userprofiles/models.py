from django.conf import settings
from django.db import models
from django.contrib.auth.models import  Group


# Create your models here.
        
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete= models.CASCADE, db_index=True)
    friends = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name="friend" )
    group = models.ManyToManyField(Group, blank=True,)


    def __str__(self):
        return str(self.user)

    
STATUS_CHOICES = (
    ("accept", "accept"),
    ("send", "send"),

)

        
class Relationship(models.Model):
    sender = models.ForeignKey(Profile, on_delete= models.CASCADE,  related_name= "senders")
    receiver = models.ForeignKey(Profile, on_delete= models.CASCADE, related_name= 'receivers')
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    date_created = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return f"{self.sender}-{self.receiver}-{self.status}"

class blockedusers(models.Model):
    blocker = models.ForeignKey(Profile, on_delete= models.CASCADE,  related_name= "blocker")
    blocked = models.ForeignKey(Profile, on_delete= models.CASCADE,  related_name= "blocked")