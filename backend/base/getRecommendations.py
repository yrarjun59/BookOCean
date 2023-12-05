import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from .models import Book


def get_and_load_data():
    try:
        data = pd.read_csv('/books_data.csv', low_memory=False)
        return data
    except FileNotFoundError:
        print("FIle Not Found")

# Function to recommend books based on category and author similarities
def getRecommendations(book_name, top_n=3):

    try:
        data = get_and_load_data()
        data['description'] = data['description'].fillna('')
        data['category'] = data['category'].fillna('')
        data['author'] = data['author'].fillna('')

        # TF-IDF Vectorization for description, category, and author
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix_description = tfidf.fit_transform(data['description'])
        tfidf_matrix_category = tfidf.fit_transform(data['category'])
        tfidf_matrix_author = tfidf.fit_transform(data['author'])

        # Calculate cosine similarity matrices
        cosine_sim_category = cosine_similarity(tfidf_matrix_category, tfidf_matrix_category)
        cosine_sim_author = cosine_similarity(tfidf_matrix_author, tfidf_matrix_author)
        cosine_sim_description = cosine_similarity(tfidf_matrix_description, tfidf_matrix_description)
        
        idx = data[data['name'] == book_name].index[0] 

        # Calculate the combined similarity based on category ,author and description
        combined_similarity = (cosine_sim_category[idx] + cosine_sim_author[idx] + cosine_sim_description[idx]) / 3
        # combined_similarity = (cosine_sim_category[idx] + cosine_sim_author[idx] ) / 2

        # Get indices of books with highest similarity scores
        similar_books_indices = combined_similarity.argsort()[::-1][1:top_n + 1]

        # Return recommended book ids
        recommended_books_id = data.iloc[similar_books_indices]['id']

        # return dataframe into_list
        similar_books_ids_list = recommended_books_id.tolist()

        recommended_books = Book.objects.filter(_id__in=similar_books_ids_list)
        return recommended_books
    except Exception as e:
        print(f"An error occurred: {e}")

