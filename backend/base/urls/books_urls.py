from django.urls import path
from base.views import books_views as views


urlpatterns = [
    path("", views.getBooks, name="books"),
    path("requests/", views.getBookRequests, name="books-requests"),
    path("top/", views.getTopBooks, name="top-books"),
    path("create/", views.createBook, name="book-create"),
    path("upload/", views.uploadImage, name="image-upload"),
    path("request/", views.requestBook, name="request-book"),
    path("my/requests/", views.myRequestBooks, name="my-requests-book"),
    path("my/books/", views.myBooks, name="my-books"),
    # path("notifications/", views.getNotifications, name="notifications"),
    path("<str:pk>/", views.getBook, name="book"),
    path("<str:pk>/reviews/", views.createBookReview, name="create-book-review"),
    path("category/all/", views.getAllCategory, name="categories"),
    path("author/all/", views.getAllAuthors, name="authors"),
    path("update/<str:pk>/", views.updateBook, name="book-update"),
    path("delete/<str:pk>/", views.deleteBook, name="book-delete"),
]
