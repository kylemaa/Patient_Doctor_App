from django.contrib import admin

# Register your models here.
from .models import Prescription, SignedPrescription

admin.site.register(Prescription)
admin.site.register(SignedPrescription)
