from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
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
@parser_classes([MultiPartParser])  # Apply MultiPartParser correctly
def file_upload(request):
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=400)

    uploaded_file = request.FILES['file']
    allowed_types = ['csv', 'csvx', 'geojson', 'zip', 'shp']

    if uploaded_file.name.split('.')[-1].lower() not in allowed_types:
        return Response({'error': 'Invalid file type'}, status=400)

    # Use serializer for validation & saving
    file_serializer = UploadedFileSerializer(data={'file': uploaded_file})
    if file_serializer.is_valid():
        file_serializer.save()
        return Response({'message': 'File uploaded successfully'}, status=201)
    
    return Response(file_serializer.errors, status=400)

@api_view(['POST'])
def predict(request):
    try:
        input_data = json.loads(request.body).get("data")
        prediction_result = f"Predicted value for {input_data}"
        return Response({"prediction": prediction_result})
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON format'}, status=400)
