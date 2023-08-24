from rest_framework import serializers

from news.models import Section, Article
from news.serializers.image import SubImageSerializer
from news.serializers.text import SubTextSerializer
from news.utils import get_section_max_queue_value


class NewsSerializerForSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'category']
        depth = 1


class SectionListSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='section', lookup_field='id')
    queue = serializers.IntegerField(read_only=True)

    def create(self, validated_data):
        validated_data['queue'] = get_section_max_queue_value(validated_data['article']) + 1
        return super(SectionListSerializer, self).create(validated_data)

    class Meta:
        model = Section
        fields = ['id', 'article', 'queue', 'header', 'url']


class SectionListSerializerForSafeMethods(SectionListSerializer):
    article = NewsSerializerForSectionSerializer(read_only=True)

    class Meta(SectionListSerializer.Meta):
        depth = 1


class SectionSerializer(serializers.ModelSerializer):
    queue = serializers.IntegerField(read_only=True)

    class Meta:
        model = Section
        fields = ['id', 'queue', 'header']


class SectionSerializerForSafeMethods(SectionSerializer):
    texts = SubTextSerializer(many=True, read_only=True)
    images = SubImageSerializer(many=True, read_only=True)
    article = NewsSerializerForSectionSerializer(read_only=True)

    class Meta(SectionSerializer.Meta):
        fields = SectionSerializer.Meta.fields + ['article', 'texts', 'images']
        depth = 1
