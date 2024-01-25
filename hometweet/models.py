from django.db import models
from django.utils.text import slugify
from user.models import CustomUser
from userprofiles.models import Profile
import random
import string
from cloudinary.models import CloudinaryField




# def compress_image(image): 
#     print('compr') 
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

# Create your models here.
REACTION_CHIOCES = (
    ("like", "like"),
    ("love", "love"),
    ("angry", "angry"),
    ("care", "care"),
    ("wow", "wow"),
    ("sad", "sad"),
    )



class Post(models.Model):
    content = models.TextField(null= True, blank= True)
    file = CloudinaryField('image',null= True, blank= True)
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "tweet_author")
    slug = models.SlugField(unique=True, max_length=100, allow_unicode=True)
    likes = models.ManyToManyField(CustomUser, related_name="liked_posts", blank=True)

    
    def generate_unique_slug(self):
        if(self.content):
            base_slug = slugify(self.content)
        else:
            strs= generate_random_string(3)
            base_slug = slugify(strs +self.author.username)
        slug = base_slug
        counter = 1
        while Post.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        return slug

    def __str__(self):
        return f"{self.content}-{self.author}"  
    
    # def save(self, *args, **kwargs):
    #         self.image = compress_image(self.image)
    #         super().save(*args, **kwargs)

    
    def save(self, *args, **kwargs):        
        if not self.slug:
            self.slug = self.generate_unique_slug()

        super().save(*args, **kwargs)



class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    # class Meta:
    #     unique_together = ('user', 'post')


    # def like(self):
    #     self.like_count += 1
    #     self.save()

    # def unlike(self):
    #     if self.like_count > 0:
    #         self.like_count -= 1
    #         self.save()
     

class Reply(models.Model):
    reply_author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "reply_author")
    reply = models.TextField()
    reply_pics = models.ImageField(null= True, blank= True, upload_to= 'images/')
    date_created = models.DateTimeField(auto_now_add=True)
    comment_id= models.IntegerField()


class Coment(models.Model):
    comment_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name= "post_comments")
    comment_author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "comment_author")
    comments = models.TextField()
    comment_pics = models.ImageField(null= True, blank= True, upload_to= 'images/')
    comment_date_created = models.DateTimeField(auto_now_add=True)
    replies= models.ManyToManyField(Reply, blank=True, related_name= "comment_reply")
    # slug = models.SlugField(unique=True, max_length=100, allow_unicode=True)

        
    def generate_unique_slug(self):
        base_slug = slugify(self.comments)
        slug = base_slug
        counter = 1
        while Coment.objects.filter(slug=slug).exclude(pk=self.pk).exists():
            slug = f"{base_slug}-{counter}"
            counter += 1
        print(slug)    
        return slug


class Reaction(models.Model):
    profiles = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name= "profile")
    Reaction_post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name= "post")
    Reaction_coment = models.ForeignKey(Coment,null=True, blank=True, on_delete=models.CASCADE, related_name= "coment")
    Reaction_reply = models.ForeignKey(Reply, null=True, blank=True, on_delete=models.CASCADE, related_name= "reaction_reply")
    reactions = models.CharField(max_length=50, choices=REACTION_CHIOCES)

    def __str__(self):
        return self.reactions

class Status(models.Model):
    text = models.CharField( max_length=150, null=True, blank=True)
    file = CloudinaryField('image',null= True, blank= True)
    date_created = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name= "status_author")

    def __str__(self):
        return f"{self.text} / {self.author}"


class Notification(models.Model):
    content = models.TextField(max_length=512)
    postId = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="postId", null= True, blank= True, )
    sender= models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="notificationsender")
    receiver= models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="notificationreceiver")
    timestamp = models.DateTimeField(auto_now_add=True)
    seen=models.BooleanField()
 