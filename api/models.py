from django.db import models
from users.models import User
# Create models for doctor and patient here


class Prescription(models.Model):
    title = models.CharField(max_length=50)
    doctor = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class SignedPrescription(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE)
    prescription = models.ForeignKey(
        Prescription, on_delete=models.SET_NULL, blank=True, null=True)
    is_signed = models.BooleanField()

    def __str__(self):
        return self.patient.username
