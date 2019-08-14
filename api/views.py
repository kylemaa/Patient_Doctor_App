from django.shortcuts import render
from .models import Prescription
from .serializers import PrescriptionSerializer
from rest_framework import viewsets


class PrescriptionViewSet(viewsets.ModelViewSet):
    serializer_class = PrescriptionSerializer
    queryset = Prescription.objects.all()
