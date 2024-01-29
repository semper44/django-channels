from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Reply, Coment
# from groupapp.models import Groupapp

@receiver(post_save, sender=Reply)
def adding_replies(sender, instance, created, *args, **kwargs):
    if created:
        comment= Coment.objects.get(id=instance.comment_id)
        print(comment)
        print(instance.comment_id)
        comment.replies.add(instance)
        comment.save
        # reply = get_object_or_404(Coment, id=comment_id)  

    