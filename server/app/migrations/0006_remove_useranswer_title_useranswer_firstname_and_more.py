# Generated by Django 5.1.5 on 2025-02-07 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_remove_question_order_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='useranswer',
            name='title',
        ),
        migrations.AddField(
            model_name='useranswer',
            name='firstname',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='useranswer',
            name='lastname',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='useranswer',
            name='user_text',
            field=models.TextField(default=''),
        ),
    ]
