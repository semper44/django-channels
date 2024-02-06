# Generated by Django 3.2.23 on 2024-01-29 01:35

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('groupapp', '0002_alter_usergroups_cover_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergroups',
            name='cover_photo',
            field=cloudinary.models.CloudinaryField(blank=True, default='szlqfwnmhsnbekmmxzsi', max_length=255, null=True, verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='usergroups_post',
            name='file',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]