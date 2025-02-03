from django.contrib import admin
from .models import *


class SubjectAdmin(admin.ModelAdmin):
    list_display = [
        'name',
    ]


class LevelAdmin(admin.ModelAdmin):
    list_display = [
        'name',
        'code',
    ]


class QuestionAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'level',
        'subject',
        'created_at',
        'updated_at',
    ]


class AnswerAdmin(admin.ModelAdmin):
    list_display = [
        'title',
        'question',
        'created_at',
        'updated_at',
    ]


class UserAnswerAdmin(admin.ModelAdmin):
    list_display = [
        'title',
    ]


class UserResultAdmin(admin.ModelAdmin):
    list_display = [
        'id'
    ]


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Level, LevelAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
admin.site.register(UserResult, UserResultAdmin)
