from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime


from base.models import Book, Order, OrderItem, ShippingAddress
from base.serializers import BookSerializer, OrderSerializer

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data

    orderItems = data["orderItems"]

    if orderItems and len(orderItems) == 0:
        return Response(
            {"detail": "No Order Items"}, status=status.HTTP_400_BAD_REQUEST
        )
    else:
        # (1) Create order

        order = Order.objects.create(
            user=user,
            # paymentMethod=data["paymentMethod"],
            taxPrice=data["taxPrice"],
            shippingPrice=data["shippingPrice"],
            totalPrice=data["totalPrice"],
        )

        # (2) Create shipping address

        shipping = ShippingAddress.objects.create(
            order=order,
            address=data["shippingAddress"]["address"],
            city=data["shippingAddress"]["city"],
            postalCode=data["shippingAddress"]["postalCode"],
        )

        # (3) Create order items and set order to orderItem relationship
        for i in orderItems:
            print(i)
            book = Book.objects.get(_id=i["bookId"])
            print("book", book)

            item = OrderItem.objects.create(
                book=book,
                order=order,
                name=book.name,
                qty=i["qty"],
                price=i["price"],
                image=book.image.url,
                # author = book.author
                # category = book.category
            )

            # (4) Update stock

            book.countInStock -= item.qty
            book.save()

        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all().order_by('-createdAt')

    page = request.query_params.get("page")
    paginator = Paginator(orders, 4)

    if page is not None:
        try:
            orders = paginator.page(page)
        except PageNotAnInteger:
            orders = paginator.page(1)
        except EmptyPage:
            orders = paginator.page(paginator.num_pages)
    else:
        page = 1

    page = int(page)
    serializer = OrderSerializer(orders, many=True)
    return Response(
        {"orders": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getOrders(request):
    orders = Order.objects.order_by("-createdAt")

    page = request.query_params.get("page")
    paginator = Paginator(orders, 4)

    if page is not None:
        try:
            orders = paginator.page(page)
        except PageNotAnInteger:
            orders = paginator.page(1)
        except EmptyPage:
            orders = paginator.page(paginator.num_pages)
    else:
        page = 1

    page = int(page)
    serializer = OrderSerializer(orders, many=True)
    return Response(
        {"orders": serializer.data, "page": page, "pages": paginator.num_pages}
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response(
                {"detail": "Not authorized to view this order"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    except:
        return Response(
            {"detail": "Order does not exist"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()

    return Response("Order was paid")


@api_view(["PUT"])
@permission_classes([IsAdminUser])
def updateOrderToDelivered(request, pk):
    order = Order.objects.get(_id=pk)

    order.isDelivered = True
    order.deliveredAt = datetime.now()
    order.save()

    return Response("Order was delivered")
