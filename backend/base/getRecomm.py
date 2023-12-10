import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_and_load_data():
    try:
        data = pd.read_csv('/books_data.csv', low_memory=True)
        return data
    except FileNotFoundError:
        print("FIle Not Found")


def getRecommendations(book_name, top_n=3):
    try:
        data = get_and_load_data()

        # find the index of the input book
        book_index = data[data['name'] == book_name].index[0]
        
        # Combine text attributes into one column
        data['combined_features'] = data['description'].fillna('') + ' ' + data['category'].fillna('') + ' ' + data['author'].fillna('')
        
        # Convert text data to numerical representation using 
        # Term Frequency -Inverse Document Frequency
        # remove commonly used english words like "the", "is", etc.
        tfidf = TfidfVectorizer(stop_words='english') 
        tfidf_matrix = tfidf.fit_transform(data['combined_features'])
        
        # Calculate similarity between books
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        # Get indices
        similar_books_indices = cosine_sim[book_index].argsort()[::-1][1:top_n + 1]
        # Retrieve recommended books' IDs based on similarity
        recommended_books_id = data.iloc[similar_books_indices]['id'].tolist()

        return recommended_books_id
    except Exception as e:
        print(f"An error occurred: {e}")
