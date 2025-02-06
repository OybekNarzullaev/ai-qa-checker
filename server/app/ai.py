from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.translate.bleu_score import sentence_bleu, brevity_penalty
import math
# NLTK uchun resurslarni yuklab olish
nltk.download('punkt')


def get_cosine_similarity(user_text='', actual_texts=[]):
    max_cosine_similarity = 0
    vectorizer = TfidfVectorizer(analyzer='word')
    for a in actual_texts:
        tfidf_matrix = vectorizer.fit_transform([user_text, a])

        similarity = cosine_similarity(tfidf_matrix[0], tfidf_matrix[1])
        if max_cosine_similarity < similarity[0][0]:
            max_cosine_similarity = similarity[0][0]
    return max_cosine_similarity


def get_bleu_similarity(user_text='', actual_texts=[]):
    reference = []
    reference_length = 10000
    for t in actual_texts:
        sentences = t.split('.')
        for s in sentences:
            s = s.replace(',', '')
            s = s.strip()
            if s.split() == []:
                continue
            reference.append(s.split())
            diff = len(s.split()) - len(user_text.split())
            if math.fabs(diff) < reference_length:
                reference_length = diff

    candidate = user_text.split()

    bleu_score = sentence_bleu(reference, candidate, weights=(1, 0, 0, 0))

    candidate_length = len(candidate)

    bp = brevity_penalty(reference_length, candidate_length)
    print(reference_length)

    final_score = bleu_score * bp
    return final_score


def get_jaccard_similarity(user_text='', actual_texts=[]):
    max_val = 0
    for t in actual_texts:
        intersection = len(set(t.split()).intersection(user_text.split()))
        union = len(set(t.split()).union(user_text.split()))
        if max_val < intersection / union:
            max_val = intersection / union
    # Jaccard o'xshashligini hisoblash
    return max_val
