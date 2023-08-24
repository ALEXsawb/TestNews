from rest_framework import serializers

from news.models import Article
from news.serializers.section import SectionSerializer, SectionSerializerForSafeMethods


class NewsSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='article', lookup_field='slug')

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'category', 'url']


class NewsSerializerForSafeMethods(NewsSerializer):
    class Meta(NewsSerializer.Meta):
        depth = 1


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'category', 'slug']


class ArticleSerializerForSafeMethods(ArticleSerializer):
    sections = SectionSerializerForSafeMethods(source='section_set', many=True)

    class Meta(ArticleSerializer.Meta):
        fields = ArticleSerializer.Meta.fields + ['sections', ]
        depth = 2
