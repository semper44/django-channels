# Generated by Django 3.2.23 on 2024-01-23 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('groupapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergroups',
            name='cover_photo',
            field=models.ImageField(blank=True, default='group.jpg', null=True, upload_to='group_cover/'),
        ),
    ]