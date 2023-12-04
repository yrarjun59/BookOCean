from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.timesince import timesince
from django.utils.translation import gettext_lazy as _
import os

class Category(models.Model):
    name = models.CharField(max_length=100)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name) if self.name else ""


class Author(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name) if self.name else ""


def get_unique_filename(instance, filename):
    upload_to = "images"
    ext = filename.split(".")[-1]
    filename = f"{uuid.uuid4().hex}.{ext}"

    # Check if a file with the same name already exists
    if os.path.exists(os.path.join(upload_to, filename)):
        # Handle the conflict by generating a new unique filename
        filename = get_unique_filename(instance, filename)


class Book(models.Model):
    owner = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default="/sample.png")
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, blank=True
    )
    author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True, default=0.0
    )
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    soldCount = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name) if self.name else ""


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    books = models.ManyToManyField(Book, through="CartItem")
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Cart {self._id}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"CartItem {self.book.name}"


class Review(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"{self.rating} for {self.book.name}"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    totalPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"Order #{self._id} on {self.createdAt}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.PositiveIntegerField(null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return f"OrderItem {self.name}"


class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True
    )
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)


class BookRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    author = models.CharField(max_length=200, null=True, blank=True)
    reference_link = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)
    isResponse = models.BooleanField(default=False)
    requestAt = models.DateTimeField(auto_now_add=True)

    @property
    def request_at(self):
        return timesince(self.requestAt).split(", ")[0] + _(" ago")

    def __str__(self):
        return f"{self.name} on {self.request_at}"


class Notify(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,blank=True)
    message = models.CharField(max_length=255, default=None, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True, verbose_name=("createAt"))
    is_read = models.BooleanField(default=False)

    @property
    def created_at(self):
        return timesince(self.createdAt).split(", ")[0] + _(" ago")


    def __str__(self):
        return f"{self.message} on {self.created_at}"
