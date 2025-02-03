from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from .ai import get_cosine_similarity


class SubjectAPIView(APIView):
    def get(self, request, id=None):
        if id is not None and type(id) == int:
            subject = Subject.objects.get(id=id)
            subject = SubjectSerializer(subject, many=False).data
            return Response(data=subject)

        subjects = Subject.objects.annotate(questions_count=Count('questions'))
        subjects_data = SubjectSerializer(subjects, many=True).data
        for s in subjects_data:
            s['questions_count'] = subjects.get(id=s['id']).questions_count
        return Response(data=subjects_data)


class LevelAPIView(APIView):
    def get(self, request, id=None):
        if id is not None and type(id) == int:
            level = Level.objects.get(id=id)
            level = LevelSerializer(level, many=False).data
            return Response(data=level)

        levels = Level.objects.all()
        levels = LevelSerializer(levels, many=True).data
        return Response(data=levels)


class QuestionAPIView(APIView):
    def get(self, request, id=None):

        if id is not None and type(id) == int:
            question = Question.objects.get(id=id)
            question = QuestionSerializer(question, many=False).data
            return Response(data=question)

        questions = Question.objects.all()
        subject_id = request.query_params.get('subject_id')
        level_id = request.query_params.get('level_id')

        if subject_id:
            questions = questions.filter(subject_id=subject_id)

        if level_id:
            questions = questions.filter(level_id=level_id)

        subject = Subject.objects.get(id=subject_id)
        subject = SubjectSerializer(subject, many=False).data
        questions = QuestionSerializer(questions, many=True).data
        data = {
            'subject': subject,
            'questions': questions
        }

        return Response(data=data)


class AnswerAPIView(APIView):
    def get(self, request, id=None):

        if id is not None and type(id) == int:
            answer = Answer.objects.get(id=id)
            answer = AnswerSerializer(answer, many=False).data
            return Response(data=answer)

        answers = Answer.objects.all()
        answers = AnswerSerializer(answers, many=True).data
        return Response(data=answers)


class UserAnswerAPIView(APIView):
    def get(self, request, id=None):

        if id is not None and type(id) == int:
            user_answer = UserAnswer.objects.get(id=id)
            user_answer = UserAnswerSerializer(user_answer, many=False).data
            return Response(data=user_answer)

        user_answers = UserAnswer.objects.all()
        user_answers = UserAnswerSerializer(user_answers, many=True).data

        return Response(data=user_answers)

    def post(self, request):
        user_answer = request.data.get('user_answer')
        question_id = request.data.get('question_id')
        if not user_answer:
            return Response(data='javob yozing', status=400)

        actual_answers = Answer.objects.filter(
            question_id=question_id
        ).values_list('title', flat=True)

        score = get_cosine_similarity(
            user_text=user_answer,
            actual_texts=actual_answers
        )

        if question_id and user_answer:
            user_answer = UserAnswer(
                title=user_answer,
                question_id=question_id,
                score=score
            )
            user_answer = UserAnswerSerializer(user_answer, many=False).data
            return Response(data=user_answer)
        return Response(data='question_id ni yuboring', status=400)


class UserResultAPIView(APIView):
    def get(self, request, id=None):

        if id is not None and type(id) == int:
            user_result = UserResult.objects.get(id=id)
            user_result = UserResultSerializer(user_result, many=False).data
            return Response(data=user_result)

        user_results = UserResult.objects.all()
        user_results = UserResultSerializer(user_results, many=True).data

        return Response(data=user_results)
