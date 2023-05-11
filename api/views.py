from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import ProductSerializer
from .models import Product

# Create your views here.

def home(request):
	return render(request,'api/index.html')
	
@api_view(['GET'])
def products_all(request):
    product=Product.objects.all().order_by('-id')
    print (product)
    serializer=ProductSerializer(product,many='true')
    return Response(serializer.data)


@api_view(['POST'])
def productCreate(request):
	serializer = ProductSerializer(data=request.data)

	if serializer.is_valid():
		serializer.save()

	return Response(serializer.data)

@api_view(['PUT'])
def productUpdate(request,id):
	product = Product.objects.get(id=id)
	serializer = ProductSerializer(instance=product, data=request.data)

	if serializer.is_valid():
		print('true')
		serializer.save()

	return Response(serializer.data)


@api_view(['DELETE'])
def productDelete(request, id):
	product = Product.objects.get(id=id)
	product.delete()

	return Response('product deleted successfully !')