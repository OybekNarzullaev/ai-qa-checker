from django.urls import path
from .views import *

urlpatterns = [
    path('subjects/<int:id>/', SubjectAPIView.as_view()),
    path('subjects/', SubjectAPIView.as_view()),
    path('start_exam/', UserStartExamAPIView.as_view()),
    path('answer2question/', UserAnswer2QuestionAPIView.as_view()),
    path('finish_exam/', UserFinishExamAPIView.as_view()),
]
