from django.db import models

# Create your models here.

class Product(models.Model):
    name=models.CharField(max_length=100)
    description=models.CharField(max_length=2000)
    price=models.IntegerField(null=True)

    def __str__(self):
        return self.name
