# Generated by Django 5.0.2 on 2024-04-12 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0019_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='date_posted',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
