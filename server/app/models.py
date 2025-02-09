from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Level(models.Model):
    name = models.CharField(max_length=50)
    code = models.IntegerField(default=0, unique=True)

    def __str__(self):
        return self.name


class Question(models.Model):
    title = models.TextField()
    level = models.ForeignKey(
        Level,
        on_delete=models.PROTECT,
        related_name='questions'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT,
        related_name='questions'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Answer(models.Model):
    title = models.TextField()
    question = models.ForeignKey(
        Question,
        on_delete=models.PROTECT,
        related_name='answers'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class User(models.Model):
    fullname = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.fullname


class UserAnswer(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_answers'
    )
    user_text = models.TextField(default='')
    question = models.ForeignKey(
        Question,
        on_delete=models.PROTECT,
        related_name='user_answers'
    )
    score = models.FloatField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user_text


class UserResult(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_results'
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.PROTECT,
        related_name='user_results'
    )
    avg_score = models.FloatField(default=0)
    grade = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.subject.name
