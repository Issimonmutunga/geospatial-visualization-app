from django.urls import path
from .views import visualization, file_upload, predict

urlpatterns = [
    path('visualization/', visualization, name="visualization"),
    path('upload/', file_upload, name="upload"),
    path('predict/', predict, name="predict"),
]
