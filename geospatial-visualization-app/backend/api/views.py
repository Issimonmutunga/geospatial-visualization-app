from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import UploadedFile
from .serializers import UploadedFileSerializer
import json
#Started here 3/18/2025
import os, zipfile, tempfile,geopandas as gpd
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings



@api_view(['GET'])
def visualization(request):
    media_folder = os.path.join(os.getcwd(), "media", "uploads")
    geojson_features = []

    if not os.path.exists(media_folder):
        return Response({"error": "Uploads folder not found."}, status=404)

    for file in os.listdir(media_folder):
        file_path = os.path.join(media_folder, file)

        try:
            if file.lower().endswith('.zip'):
                with tempfile.TemporaryDirectory() as tmpdir:
                    with zipfile.ZipFile(file_path, 'r') as zip_ref:
                        zip_ref.extractall(tmpdir)
                    for extracted_file in os.listdir(tmpdir):
                        if extracted_file.endswith('.shp'):
                            shp_path = os.path.join(tmpdir, extracted_file)
                            gdf = gpd.read_file(shp_path)
                            geojson_features.extend(gdf.__geo_interface__.get("features", []))

            elif file.lower().endswith(('.shp', '.geojson', '.json')):
                gdf = gpd.read_file(file_path)
                geojson_features.extend(gdf.__geo_interface__.get("features", []))
        except Exception as e:
            print(f"Error processing {file}: {e}")

    final_geojson = {
        "type": "FeatureCollection",
        "features": geojson_features
    }
    return Response(final_geojson) 
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
