from django.contrib import admin

# Register your models here.
from .models import Prescription

admin.site.register(Prescription)
