from django.contrib import admin
from .models import *


class SubjectAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = [
        'name',
    ]


class LevelAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = [
        'name',
        'code',
    ]


class QuestionAdmin(admin.ModelAdmin):
    list_filter = ('subject', 'level')
    search_fields = ('title',)
    list_display = [
        'title',
        'level',
        'subject',
        'created_at',
        'updated_at',
    ]


class AnswerAdmin(admin.ModelAdmin):
    list_filter = ('question',)
    search_fields = ('title',)
    list_display = [
        'title',
        'question',
        'created_at',
        'updated_at',
    ]


class QuizQuestionAdmin(admin.ModelAdmin):
    list_filter = ('subject', 'level')
    search_fields = ('title',)
    list_display = [
        'title',
        'level',
        'subject',
        'created_at',
        'updated_at',
    ]


class QuizAnswerAdmin(admin.ModelAdmin):
    list_filter = ('question',)
    search_fields = ('title',)
    list_display = [
        'title',
        'question',
        'created_at',
        'updated_at',
    ]


class UserAdmin(admin.ModelAdmin):
    search_fields = ('fullname',)
    list_display = [
        'fullname',
        'created_at',
        'updated_at',
    ]


class UserAnswerAdmin(admin.ModelAdmin):
    search_fields = ('user_text', 'firstname', 'lastname')
    list_display = [
        'question',
        'user',
        'user_text',
        'score',
        'created_at',
        'updated_at',
        'user_text',
    ]


class UserQuizAnswerAdmin(admin.ModelAdmin):
    search_fields = ('user_text', 'firstname', 'lastname')
    list_display = [
        'question',
        'user',
        'user_text',
        'score',
        'created_at',
        'updated_at',
        'user_text',
    ]


class UserResultAdmin(admin.ModelAdmin):
    list_display = [
        'id'
    ]


admin.site.register(Subject, SubjectAdmin)
admin.site.register(Level, LevelAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Answer, AnswerAdmin)
admin.site.register(QuizQuestion, QuizQuestionAdmin)
admin.site.register(QuizAnswer, QuizAnswerAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(UserAnswer, UserAnswerAdmin)
admin.site.register(UserQuizAnswer, UserQuizAnswerAdmin)
admin.site.register(UserResult, UserResultAdmin)
