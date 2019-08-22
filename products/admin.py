from django.contrib import admin
from .models import Product, OrderProduct, Order

admin.site.register(Product)
admin.site.register(OrderProduct)
admin.site.register(Order)
