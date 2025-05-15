import os
import zipfile
import tempfile
import json
import logging
import geopandas as gpd
import pyproj
from osgeo import ogr, osr
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response

from .models import UploadedFile
from .serializers import UploadedFileSerializer

# Setup logging
logger = logging.getLogger(__name__)


def reproject_geometry(geom_wkt, source_epsg, target_epsg=4326):
    """Reprojects geometry from source EPSG to target EPSG."""
    source = osr.SpatialReference()
    source.ImportFromEPSG(source_epsg)
    target = osr.SpatialReference()
    target.ImportFromEPSG(target_epsg)
    transform = osr.CoordinateTransformation(source, target)
    geom = ogr.CreateGeometryFromWkt(geom_wkt)
    geom.Transform(transform)
    return json.loads(geom.ExportToJson())


def get_epsg_from_prj(prj_path):
    """Attempts to determine EPSG code from a .prj file."""
    try:
        with open(prj_path, 'r') as f:
            prj_txt = f.read()
        crs = pyproj.CRS.from_wkt(prj_txt)
        return crs.to_epsg()
    except Exception as e:
        logger.warning(f"Could not determine EPSG from {prj_path}: {e}")
        return 4326  # fallback
    


@api_view(['GET'])
def file_list(request):
    """Returns only the list of file names."""
    media_folder = os.path.join(os.getcwd(), "media", "uploads")
    logger.info(f"Checking media folder at: {media_folder}")

    file_names = []

    if not os.path.exists(media_folder):
        return Response({"error": "Uploads folder not found."}, status=404)

    for file in os.listdir(media_folder):
        file_path = os.path.join(media_folder, file)
        name, _ = os.path.splitext(file)
        file_names.append(name)

    return Response({"files": file_names})



@api_view(['GET'])
def visualization(request):
    """Reads uploaded geospatial files, reprojects, and returns GeoJSON."""
    media_folder = os.path.join(os.getcwd(), "media", "uploads")
    logger.info(f"Checking media folder at: {media_folder}")

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
                            epsg = gdf.crs.to_epsg() if gdf.crs else get_epsg_from_prj(shp_path.replace('.shp', '.prj'))
                            for _, row in gdf.iterrows():
                                geom_json = reproject_geometry(row.geometry.wkt, epsg)
                                geojson_features.append({
                                    "type": "Feature",
                                    "geometry": geom_json,
                                    "properties": row.drop(labels='geometry').to_dict()
                                })

            elif file.lower().endswith(('.shp', '.geojson', '.json')):#Checks the file
                gdf = gpd.read_file(file_path)
                epsg = gdf.crs.to_epsg() if gdf.crs else get_epsg_from_prj(file_path.replace('.shp', '.prj'))
                for _, row in gdf.iterrows():
                    geom_json = reproject_geometry(row.geometry.wkt, epsg)
                    geojson_features.append({
                        "type": "Feature",
                        "geometry": geom_json,
                        "properties": row.drop(labels='geometry').to_dict()
                    })
        except Exception as e:
            logger.error(f"Error processing {file}: {e}")

    final_geojson = {
        "type": "FeatureCollection",
        "features": geojson_features
    }

    return Response(final_geojson)


@api_view(['POST'])
@parser_classes([MultiPartParser])
def file_upload(request):
    """Handles file uploads for supported geospatial formats."""
    if 'file' not in request.FILES:
        return Response({'error': 'No file provided'}, status=400)

    uploaded_file = request.FILES['file']
    allowed_types = ['csv', 'csvx', 'geojson', 'zip', 'shp', 'json']

    if uploaded_file.name.split('.')[-1].lower() not in allowed_types:
        return Response({'error': 'Invalid file type'}, status=400)

    file_serializer = UploadedFileSerializer(data={'file': uploaded_file})
    if file_serializer.is_valid():
        file_serializer.save()
        return Response({'message': 'File uploaded successfully'}, status=201)

    return Response(file_serializer.errors, status=400)


@api_view(['POST'])
def predict(request):
    """A placeholder endpoint for making predictions based on posted data."""
    try:
        input_data = json.loads(request.body).get("data")
        prediction_result = f"Predicted value for {input_data}"
        return Response({"prediction": prediction_result})
    except json.JSONDecodeError:
        return Response({'error': 'Invalid JSON format'}, status=400)
