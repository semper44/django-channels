from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _
from cloudinary.models import CloudinaryField
# from cloudinary import uploader





# def compress_image(image):    
#     img = Image.open(image)
#     if img.mode != "RGB":
#         img = img.convert("RGB")   
#     img_output = BytesIO()     
#     img.save(img_output, 'JPEG', quality=80)     
#     compressed_image = File(img_output, name=image.name)    
#     return compressed_image


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password=None):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("The Email must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save(using= self._db)
        return user

    def create_superuser(self, email, password=None):
        """
        Create and save a SuperUser with the given email and password.
        """
        user=self.create_user(
            email=email,
            password=password
        )
        user.is_staff= True
        user.is_superuser= True
        user.admin= True
        user.save(using=self.db)
        return user
    
class CustomUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    bio = models.TextField(blank= True)
    last_activity = models.DateTimeField(null=True, blank=True)
    prof_pics = CloudinaryField('image',default='c40te5wgb08lfd5em1pq')
    cover_photo = CloudinaryField('image', default='n1obcqp4snevd7wpmbqz')
    date_joined=models.DateTimeField(auto_now_add=True, verbose_name="date_joined") 
    last_login=models.DateTimeField(verbose_name="last_login", auto_now=True,)
    is_active=models.BooleanField(default=True) 
    is_superuser=models.BooleanField(default=False)
    is_admin=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    notifications= models.IntegerField(default=0)
    message_notif= models.IntegerField(default=0)
    logout_notification= models.IntegerField(default=0)
    logout_message_notification= models.IntegerField(default=0)



    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    


