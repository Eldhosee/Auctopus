from api import views
from django.urls import path
urlpatterns = [
    path("",views.home,name="home"),
    path("product-all",views.products_all,name='products_all'),
    path("create",views.productCreate,name='create'),
    path("update/<str:id>",views.productUpdate,name='update'),
    path("delete/<str:id>",views.productDelete,name='delete'),
]
