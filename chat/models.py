from django.contrib.auth.models import User
from django.db import models
from django.dispatch import Signal
from user.models import CustomUser
from userprofiles.models import Profile


# class Room(models.Model):
#     name = models.CharField(max_length=128)
#     online = models.ManyToManyField(to=CustomUser, blank=True)

#     def get_online_count(self):
#         return self.online.count()

#     def join(self, user):
#         self.online.add(user)
#         self.save()

#     def leave(self, user):
#         self.online.remove(user)
#         self.save()

#     def __str__(self):
#         return f'{self.name} ({self.get_online_count()})'

# post_saved = Signal()

class Message(models.Model):
    content = models.TextField(max_length=512)
    uniqueId = models.CharField(max_length=512)
    sender= models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="messagesender")
    receiver= models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="messagereceiver")
    timestamp = models.DateTimeField(auto_now_add=True)
    seen=models.BooleanField()

    class Meta:
        indexes = [
            models.Index(fields=['sender', 'receiver'])
        ]

    def __str__(self):
        return f'{self.content}'
    


    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     # Send the signal when a Post is saved
    #     post_saved.send(sender=self.__class__, post=self)