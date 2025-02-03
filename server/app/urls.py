from django.urls import path
from .views import *

urlpatterns = [
    path('subjects/<int:id>/', SubjectAPIView.as_view()),
    path('subjects/', SubjectAPIView.as_view()),

    path('levels/<int:id>/', LevelAPIView.as_view()),
    path('levels/', LevelAPIView.as_view()),

    path('questions/<int:id>/', QuestionAPIView.as_view()),
    path('questions/', QuestionAPIView.as_view()),

    path('answers/<int:id>/', AnswerAPIView.as_view()),
    path('answers/', AnswerAPIView.as_view()),

    path('user_answers/<int:id>/', UserAnswerAPIView.as_view()),
    path('user_answers/', UserAnswerAPIView.as_view()),

    path('user_results/<int:id>/', UserResultAPIView.as_view()),
    path('user_results/', UserResultAPIView.as_view()),
]
