from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.utils import timezone
from django.contrib.auth.models import User


from .models import BookRequest, Notify


def createBookRequest(sender, instance, created, **kwargs):
    if created:
        print("succesfully created and triggered signal")
        book_request = instance
        book_name = book_request.name
        timestamp = timezone.now()
    

        notify = Notify.objects.create(
            user = book_request.user,
            message=f" {book_name} on",
            createdAt = timestamp,
        )
        notify.save()

post_save.connect(createBookRequest, sender=BookRequest)
