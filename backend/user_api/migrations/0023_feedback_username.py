# Generated by Django 5.0.2 on 2024-04-28 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0022_feedback_car_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='username',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
