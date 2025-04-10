from django.urls import path
from .views import visualization, file_upload, predict,file_list

urlpatterns = [
    path('visualization/', visualization, name="visualization"),
    path('upload/', file_upload, name="upload"),
    path('predict/', predict, name="predict"),
    path('file_list/',file_list, name="file_list"),
]
