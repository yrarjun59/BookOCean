from rest_framework import serializers
from .models import (
    Book,
    Author,
    Category,
    Order,
    OrderItem,
    Review,
    ShippingAddress,
    BookRequest,
    Notify
)
from users.models import User, Profile
from users.serializers import *


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = "__all__"


class BookSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    category = serializers.CharField(source="category.name")
    author = serializers.CharField(source="author.name")

    class Meta:
        model = Book
        fields = "__all__"

    def get_reviews(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data


class BookRequestSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = BookRequest
        fields = "__all__"

    def get_owner(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Review
        fields = "__all__"

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress, many=False).data
        except:
            address = False
        return address

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data


class NotifiySerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    time_ago = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Notify
        fields = "__all__"

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
    def get_time_ago(self,obj):
        return obj.created_at
