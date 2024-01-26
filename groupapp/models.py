from django.db import models

# Create your models here.
from django.db import models
from django.utils.text import slugify
from django.urls import reverse
from user.models import CustomUser
from django.contrib.auth.models import  Group
from django.urls import reverse
import random
import string
from cloudinary.models import CloudinaryField




# def compress_image(image):    
#     img = Image.open(image)
#     if img.mode != "RGB":
#         img = img.convert("RGB")   
#     img_output = BytesIO()     
#     img.save(img_output, 'JPEG', quality=80)     
#     compressed_image = File(img_output, name=image.name)    
#     return compressed_image



def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))


GROUP_CHOICES = (
    ("accept", "accept"),
    ("send", "send"),

)


class UserGroups(models.Model):
    name = models.CharField(max_length=100, null=False, blank=False, unique=True)
    members = models.ManyToManyField(CustomUser, related_name="members")    
    description = models.CharField(max_length=100, null=False, blank=False, unique=False)
    cover_photo = CloudinaryField('image',null = True, blank =True, default='szlqfwnmhsnbekmmxzsi')
    group = models.ManyToManyField(Group, blank=True)
    owner= models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="owner")
        

class UserGroups_Post(models.Model):
    usergroups=models.ForeignKey(UserGroups, on_delete=models.CASCADE, related_name= "user_groups")
    text = models.CharField(max_length=150, blank=True, null=True)
    status = models.CharField(max_length=10, choices=GROUP_CHOICES)
    file = CloudinaryField('image',null=True, blank=True,)
    author= models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="groupauthor")
    slug = models.SlugField(unique=True, max_length=100, allow_unicode=True)
    like = models.ManyToManyField(CustomUser, related_name="usergroupposts_likes", blank=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = self.generate_unique_slug()
        super().save(*args, **kwargs)
        
    def generate_unique_slug(self):
        if self.text:
            base_slug = slugify(self.author.username + self.text)
        else:
            strs= generate_random_string(3)
            base_slug = slugify(strs +self.author.username)
        slug = base_slug
        counter = 1
        while UserGroups_Post.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug


class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="usergroupuser")
    post = models.ForeignKey(UserGroups_Post, on_delete=models.CASCADE, related_name="usergrouppost")
    created_at = models.DateTimeField(auto_now_add=True)


class Group_reply(models.Model):
    reply_author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "group_reply_author")
    reply = models.TextField()
    reply_pics = models.ImageField(null= True, blank= True, upload_to= 'images/')
    date_created = models.DateTimeField(auto_now_add=True)
    comment_id= models.IntegerField()


class Group_coment(models.Model):
    comment_post = models.ForeignKey(UserGroups_Post, on_delete=models.CASCADE, related_name= "group_comments")
    comment_author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "group_comment_author")
    comments = models.TextField()
    comment_pics = models.ImageField(null= True, blank= True, upload_to= 'images/')
    comment_date_created = models.DateTimeField(auto_now_add=True)
    replies= models.ManyToManyField(Group_reply, blank=True, related_name= "comment_reply")
    comment_type= models.CharField(max_length=100, editable=False, default="group")

    def get_absolute_url(self):
        return reverse('comment_id', args=[str(self.id)])

