from django.contrib import admin

from .models  import *

admin.site.register(Category)
admin.site.register(Author)
admin.site.register(Book)
# admin.site.register(Cart)
# admin.site.register(CartItem)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(BookRequest)
admin.site.register(Notify)
