# Generated by Django 5.0.2 on 2024-04-06 12:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0010_alter_carlisting_transmission'),
    ]

    operations = [
        migrations.CreateModel(
            name='RentalBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pick_address', models.CharField(max_length=50)),
                ('pick_contact', models.PositiveIntegerField(max_length=20)),
                ('pick_date', models.DateField(auto_now=True)),
                ('pick_time', models.TimeField(auto_now=True)),
                ('drop_address', models.CharField(max_length=50)),
                ('drop_contact', models.PositiveIntegerField(max_length=20)),
                ('drop_date', models.DateField(auto_now=True)),
                ('drop_time', models.TimeField(auto_now=True)),
                ('car', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_api.carlisting')),
            ],
        ),
    ]