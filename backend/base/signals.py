# from django.db.models.signals import post_save, post_delete, pre_save
# from django.dispatch import receiver
# from django.utils import timezone
# from django.contrib.auth.models import User


# from .models import BookRequest, Notification, UserNotification


# def createBookRequest(sender, instance, created, **kwargs):
#     if created:
#         users = User.objects.all()
#         print("succesfully created and triggered signal")
#         book_request = instance
#         book_name = book_request.name
#         timestamp = timezone.now()

#         notification = Notification.objects.create(
#             message=f"{book_request.user} requested {book_name}",
#             createdAt=timestamp,
#         )

#         user_notification = UserNotification.objects.create(
#             user=book_request.user,
#             notificationMessage=notification,
#         )


# post_save.connect(createBookRequest, sender=BookRequest)
