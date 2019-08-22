from django.db import models
from users.models import User
from django.utils.timezone import now

# Create models for doctor and patient here


class Prescription(models.Model):
    title = models.CharField(db_index=True, max_length=50)
    item_name = models.CharField(max_length=50, null=True)
    quantity = models.IntegerField(null=True)
    direction = models.CharField(max_length=100, null=True)
    release_date = models.DateField(
        db_index=True, auto_now_add=True, null=True)
    patient = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.patient.username
