from rest_framework.serializers import ModelSerializer
from .models import *


class SubjectSerializer(ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'


class LevelSerializer(ModelSerializer):
    class Meta:
        model = Level
        fields = '__all__'


class QuestionSerializer(ModelSerializer):
    level = LevelSerializer()
    subject = SubjectSerializer()

    class Meta:
        model = Question
        fields = '__all__'


class AnswerSerializer(ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = Answer
        fields = '__all__'


class UserAnswerSerializer(ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = UserAnswer
        fields = '__all__'


class UserResultSerializer(ModelSerializer):
    subject = SubjectSerializer()

    class Meta:
        model = UserResult
        fields = '__all__'
