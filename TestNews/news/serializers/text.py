from rest_framework import serializers

from news.models import Text
from news.utils import SectionContent


class TextSerializer(SectionContent, serializers.ModelSerializer):
    queue = serializers.IntegerField(read_only=True)

    class Meta:
        model = Text
        fields = '__all__'


class SubTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ['id', 'queue', 'text']
