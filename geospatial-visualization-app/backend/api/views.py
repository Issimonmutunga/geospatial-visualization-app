from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import UploadedFile
from .serializers import UploadedFileSerializer
import json

@api_view(['GET'])
def visualization(request):
    geojson_data = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-74.006, 40.7128]
                },
                "properties": {"name": "Sample Point"}
            }
        ]
    }
    return Response(geojson_data)

@api_view(['POST'])
def file_upload(request):
    parser_classes = (MultiPartParser,)
    file_serializer = UploadedFileSerializer(data=request.data)

    if file_serializer.is_valid():
        file_serializer.save()
        return Response({"message": "File uploaded successfully!"})
    return Response(file_serializer.errors, status=400)

@api_view(['POST'])
def predict(request):
    input_data = json.loads(request.body).get("data")
    prediction_result = f"Predicted value for {input_data}"
    return Response({"prediction": prediction_result})