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


class QuizQuestionSerializer(ModelSerializer):
    level = LevelSerializer()
    subject = SubjectSerializer()

    class Meta:
        model = QuizQuestion
        fields = '__all__'


class AnswerSerializer(ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = Answer
        fields = '__all__'


class QuizAnswerSerializer(ModelSerializer):
    question = QuestionSerializer()

    class Meta:
        model = QuizAnswer
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UserAnswerSerializer(ModelSerializer):
    question = QuestionSerializer()
    user = UserSerializer()

    class Meta:
        model = UserAnswer
        fields = '__all__'


class UserQuizAnswerSerializer(ModelSerializer):
    question = QuestionSerializer()
    user = UserSerializer()

    class Meta:
        model = UserQuizAnswer
        fields = '__all__'


class UserResultSerializer(ModelSerializer):
    subject = SubjectSerializer()
    user = UserSerializer()

    class Meta:
        model = UserResult
        fields = '__all__'
