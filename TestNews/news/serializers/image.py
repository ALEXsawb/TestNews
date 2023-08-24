from rest_framework import serializers

from news.models import Image
from news.utils import SectionContent


class SubImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'queue', 'context', 'img']


class ImageSerializer(SectionContent, serializers.ModelSerializer):
    img_url = serializers.ImageField(source='img')
    queue = serializers.IntegerField(read_only=True)

    class Meta:
        model = Image
        fields = ['id', 'queue', 'context', 'img_url', 'section']
