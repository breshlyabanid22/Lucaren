# Generated by Django 5.0.2 on 2024-05-13 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0032_alter_carlisting_available'),
    ]

    operations = [
        migrations.AlterField(
            model_name='carlisting',
            name='available',
            field=models.BooleanField(default=True),
        ),
    ]
