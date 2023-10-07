from django.shortcuts import render
from django.shortcuts import get_object_or_404

from django.http import HttpResponse, JsonResponse

from rest_framework import status
from django.db import transaction

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd


from base.serializers import (
    BookSerializer,
    CategorySerializer,
    AuthorSerializer,
    BookRequestSerializer,
    NotifiySerializer
)

from base.models import *


@api_view(["GET"])
def getBooks(request):
    query = request.query_params.get("keyword")
    if query == None:
        query = ""
    books = Book.objects.filter(name__icontains=query).order_by("-createdAt")

    page = request.query_params.get("page")
    paginator = Paginator(books, 8)
    print("page:", page)
    length = len(books)
    print("length:", length)

    try:
        books = paginator.page(page)
    except PageNotAnInteger:
        books = paginator.page(1)
    except EmptyPage:
        books = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = BookSerializer(books, many=True)
    return Response(
        {"books": serializer.data, "page": page, "pages": paginator.num_pages,"length":length}
    )


@api_view(["GET"])
def getBook(request, pk):
    book = Book.objects.get(_id=pk)
    allBooks = Book.objects.all()

    # Create a pandas DataFrame with book data
    # book_data = pd.DataFrame(list(allBooks.values()))

    # # Select features for collaborative filtering (e.g., 'category', 'author', 'rating', etc.)
    # selected_features = ['_id','category_id', 'author_id', 'rating']

    # # Create a subset of the DataFrame with selected features
    # book_data_subset = book_data[selected_features]
    # print(book_data_subset)

    # # Calculate cosine similarity between books based on the selected features
    # similarity_matrix = cosine_similarity(book_data_subset)

    # # book_indices = book_data[book_data['_id'] == pk].index
    # book_indices = book_data[book_data['_id']==int(pk)].index

    # if not book_indices.empty:
    #     book_index = book_indices[0]
    # else:
    #     return Response({"error": "Book not found in DataFrame"}, status=status.HTTP_404_NOT_FOUND)



    # Get the similarity scores for the current book

    # similar_books_indices = similarity_matrix[book_index]
    # print("similar_books_indices",similar_books_indices)

    # Sort the books based on similarity scores
    # recommended_books_indices = similar_books_indices.argsort()[::-1]
    # print(recommended_books_indices)

    # Extract book details for the recommended books
    # recommended_books = allBooks.filter(_id__in=book_data['_id'].iloc[recommended_books_indices])
    # print(recommended_books)
    # recommendedSerializer = BookSerializer(recommended_books,many=True)


    recommended_books = Book.objects.filter(category=book.category).exclude(_id=book._id)
    recommendedSerializer = BookSerializer(recommended_books,many=True)


    serializer = BookSerializer(book, many=False)
    

    return Response({
        "book":serializer.data,
        "recommended_books":recommendedSerializer.data
    })
    


@api_view(["GET"])
def getTopBooks(request):
    books = Book.objects.filter(rating__gte=4.5).order_by("-rating")[:5]
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def requestBook(request):
    user = request.user
    data = request.data
    try:
        book = BookRequest.objects.create(
            user=user,
            name=data["name"],
            author=data["author"],
            reference_link=data["referenceLink"],
        )

        serializer = BookRequestSerializer(book, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {"detail": f"Error Occured While Requesting the book: {e}"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def myRequestBooks(request):
    user = request.user
    books = user.bookrequest_set.all()
    serializer = BookRequestSerializer(books, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def myBooks(request):
    user = request.user
    books = user.book_set.all()
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createBook(request):
    user = request.user
    data = request.data

    author_name = data["author"]
    author, created = Author.objects.get_or_create(name=author_name)
    print(f"Author Name is {author}")
    
    category_name = data["category"]
    category, created = Category.objects.get_or_create(name=category_name)
    print(f"Category Name is {category}")

    try:
        book = Book.objects.create(
            owner=user,
            name=data["name"],
            author=author,
            category=category,
            price=data["price"],
            image=request.FILES.get("image"),
            description=data["description"],
            countInStock=data["countInStock"],
        )

        serializer = BookSerializer(book, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {"detail": f"Error Occured: {e}"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateBook(request, pk):
    data = request.data
    book = Book.objects.get(_id=pk)

    author_name = data["author"]
    author, created = Author.objects.get_or_create(name=author_name)

    category_name = data["category"]
    category, created = Category.objects.get_or_create(name=category_name)

    try:
        book.name = data["name"]
        book.price = data["price"]
        book.author = author
        book.category = category
        book.countInStock = data["countInStock"]
        book.description = data["description"]
        book.save()

        serializer = BookSerializer(book, many=False)
        return Response(serializer.data)
    except Exception as e:
        message = {"detail": f"Error Occured: {e}"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def uploadImage(request):
    data = request.data

    bookID = data["bookId"]
    book = Book.objects.get(_id=bookID)

    book.image = request.FILES.get("image")
    book.save()

    return Response("Image was uploaded")


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteBook(request, pk):
    book = Book.objects.get(_id=pk)
    book.delete()
    return Response("Book Deleted")


@api_view(["GET"])
def getAllCategory(request):
    categorys = Category.objects.all()
    serializer = CategorySerializer(categorys, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def getAllAuthors(request):
    authors = Author.objects.all()
    serializer = AuthorSerializer(authors, many=True)
    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def createBookReview(request, pk):
    user = request.user
    book = Book.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    review_exists = book.review_set.filter(user=user).exists()
    if review_exists:
        content = {"detail": "book already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data["rating"] == 0:
        content = {"detail": "Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            book=book,
            name=user.first_name,
            rating=data["rating"],
            comment=data["comment"],
        )

        reviews = book.review_set.all()
        book.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        book.rating = total / len(reviews)
        book.save()

        return Response("Review Added")


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def mark_notification_as_read(request):
    unread_notifications = Notify.objects.filter(is_read=False)
    unread_notifications.update(is_read=True)
    return Response(status=status.HTTP_204_NO_CONTENT)

@permission_classes([IsAdminUser])
@api_view(["GET"])
def getNotifications(request):
    unread_notifications = Notify.objects.filter(is_read=False)
    
    notifications = Notify.objects.all().order_by('-createdAt')
    serializer = NotifiySerializer(notifications, many=True)

    unread_count = unread_notifications.count()  
    response_data = {
            "notifications": serializer.data,
            "unread_count": unread_count,  
    }
    return Response(response_data, status=status.HTTP_200_OK)


@permission_classes([IsAdminUser])
@api_view(["GET"])
def getBookRequests(request):
    books = BookRequest.objects.all().order_by('-requestAt')
    serializer = BookRequestSerializer(books, many=True)
    return Response(serializer.data)

