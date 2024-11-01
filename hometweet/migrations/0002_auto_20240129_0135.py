# Generated by Django 3.2.23 on 2024-01-29 01:35

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hometweet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='file',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
        migrations.AlterField(
            model_name='status',
            name='file',
            field=cloudinary.models.CloudinaryField(blank=True, max_length=255, null=True, verbose_name='image'),
        ),
    ]
