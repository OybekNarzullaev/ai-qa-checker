from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import gensim.downloader as api
import nltk
from nltk.translate.bleu_score import sentence_bleu

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
    for t in actual_texts:
        reference.append(t.split())
    candidate = user_text.split()
    return sentence_bleu(reference, candidate)
