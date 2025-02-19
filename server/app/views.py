from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *
from .ai import (
    get_bleu_similarity,
)


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


class UserStartExamAPIView(APIView):
    def post(self, request):
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        subject_id = request.data.get('subject_id')
        type_quiz = request.data.get('type_quiz')

        subject = Subject.objects.get(id=subject_id)

        fullname = f"{firstname} {lastname}"
        user = User.objects.filter(fullname=fullname).first()

        if user is None:
            user = User(
                fullname=f"{firstname} {lastname}",
            )
            user.save()
        else:
            answers = UserAnswer.objects.filter(
                user=user, question__subject_id=subject_id)
            results = UserResult.objects.filter(
                user=user, subject_id=subject_id)
            for a in answers:
                a.delete()
            for r in results:
                r.delete()

        user = UserSerializer(user, many=False).data
        subject = SubjectSerializer(subject, many=False).data

        if type_quiz == 'open':
            questions_l1 = QuizQuestion.objects.filter(
                subject_id=subject_id, level=Level.objects.get(code=1))
            questions_l2 = QuizQuestion.objects.filter(
                subject_id=subject_id, level=Level.objects.get(code=2))
            questions_l3 = QuizQuestion.objects.filter(
                subject_id=subject_id, level=Level.objects.get(code=3))

            question_data = []
            for i in range(questions_l1.count()):
                q1 = QuizQuestionSerializer(questions_l1[i], many=False).data
                ans = QuizAnswer.objects.filter(
                    question_id=q1['id']).order_by('?')
                q1['answers'] = QuizAnswerSerializer(ans, many=True).data
                q1['score'] = None
                q2 = QuizQuestionSerializer(questions_l2[i], many=False).data
                ans = QuizAnswer.objects.filter(
                    question_id=q2['id']).order_by('?')
                q2['answers'] = QuizAnswerSerializer(ans, many=True).data
                q2['score'] = None
                q3 = QuizQuestionSerializer(questions_l3[i], many=False).data
                ans = QuizAnswer.objects.filter(
                    question_id=q3['id']).order_by('?')
                q3['answers'] = QuizAnswerSerializer(ans, many=True).data
                q3['score'] = None
                question_data.append({
                    'max_score': 0,
                    'questions': [q1, q2, q3]
                })
            return Response(data={
                'user': user,
                'question_data': question_data,
                'subject': subject
            })

        questions_l1 = Question.objects.filter(
            subject_id=subject_id, level=Level.objects.get(code=1))
        questions_l2 = Question.objects.filter(
            subject_id=subject_id, level=Level.objects.get(code=2))
        questions_l3 = Question.objects.filter(
            subject_id=subject_id, level=Level.objects.get(code=3))

        question_data = []
        for i in range(questions_l1.count()):
            q1 = QuestionSerializer(questions_l1[i], many=False).data
            q1['score'] = None
            q2 = QuestionSerializer(questions_l2[i], many=False).data
            q2['score'] = None
            q3 = QuestionSerializer(questions_l3[i], many=False).data
            q3['score'] = None
            question_data.append({
                'max_score': 0,
                'questions': [q1, q2, q3]
            })

        return Response(
            data={
                'user': user,
                'question_data': question_data,
                'subject': subject
            }
        )


class UserAnswer2QuestionAPIView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        user_answer = request.data.get('user_answer')
        question_id = request.data.get('question_id')

        print(user_answer)
        if not user_answer:
            return Response(data='javob yozing', status=400)

        actual_answers = Answer.objects.filter(
            question_id=question_id
        ).values_list('title', flat=True)

        bleu_similarity = get_bleu_similarity(
            user_text=user_answer,
            actual_texts=actual_answers,
        )

        answer = UserAnswer(
            user_id=user_id,
            user_text=user_answer,
            question_id=question_id,
            score=bleu_similarity
        )

        answer.save()
        answer = UserAnswerSerializer(answer, many=False).data

        return Response(data=answer)


class UserFinishExamAPIView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        subject_id = request.data.get('subject_id')

        correct_answers = UserAnswer.objects.filter(
            user_id=user_id,
            score__gte=0.5
        )
        questions_level1_count = Question.objects.filter(
            subject_id=subject_id,
            level=Level.objects.get(code=1)
        ).count()

        grade = 0
        for c in correct_answers:
            if c.question.level == Level.objects.get(code=1):
                grade += 10
                continue
            if c.question.level == Level.objects.get(code=2):
                grade += 8
                continue
            if c.question.level == Level.objects.get(code=3):
                grade += 6
                continue

        result = UserResult(
            subject_id=subject_id,
            user_id=user_id,
            avg_score=grade / (10 * questions_level1_count),
            grade=grade
        )

        result = UserResultSerializer(result, many=False).data
        user = UserSerializer(user, many=False).data
        subject = SubjectSerializer(subject, many=False).data

        return Response(
            data={
                'user': user,
                'result': result,
                'subject': subject
            }
        )
