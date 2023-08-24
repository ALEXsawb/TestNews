from rest_framework import generics
from rest_framework.permissions import SAFE_METHODS

from news.models import Article
from news.permitions import UserHavePermissionOrRead
from news.serializers.article import NewsSerializerForSafeMethods, ArticleSerializer, SectionSerializer, NewsSerializer, \
    ArticleSerializerForSafeMethods
from news import utils
from news.serializers.category import CategorySerializer
from news.serializers.image import ImageSerializer
from news.serializers.section import SectionListSerializer, SectionListSerializerForSafeMethods, \
    SectionSerializerForSafeMethods
from news.serializers.text import TextSerializer


class AllNews(generics.ListCreateAPIView):
    queryset = utils.get_all_published_article()
    permission_classes = (UserHavePermissionOrRead, )
    table_name = 'article'

    def get_queryset(self):
        filters = {}
        if 'category_name' in self.request.query_params:
            filters['category__name__in'] = self.request.query_params.getlist('category_name')
        if 'category_id' in self.request.query_params:
            filters['category__id__in'] = self.request.query_params.getlist('category_id')
        if filters:
            return Article.objects.filter(is_published=True, **filters)
        return utils.get_all_published_article()

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in SAFE_METHODS:
            return NewsSerializerForSafeMethods
        else:
            return NewsSerializer


class ArticleAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = utils.get_published_articles_with_full_sections_data()
    permission_classes = (UserHavePermissionOrRead, )
    lookup_field = 'slug'
    table_name = 'article'

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in SAFE_METHODS:
            return ArticleSerializerForSafeMethods
        else:
            return ArticleSerializer


class SectionAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = utils.get_full_sections_data()
    serializer_class = SectionSerializer
    permission_classes = (UserHavePermissionOrRead, )
    lookup_field = 'id'
    table_name = 'section'

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in SAFE_METHODS:
            return SectionSerializerForSafeMethods
        else:
            return SectionSerializer


class SectionListAPI(generics.ListCreateAPIView):
    queryset = utils.get_sections_data()
    permission_classes = (UserHavePermissionOrRead, )
    table_name = 'section'

    def get_serializer_class(self, *args, **kwargs):
        if self.request.method in SAFE_METHODS:
            return SectionListSerializerForSafeMethods
        else:
            return SectionListSerializer


class TextListAPI(generics.ListCreateAPIView):
    queryset = utils.get_texts_data()
    serializer_class = TextSerializer
    permission_classes = (UserHavePermissionOrRead, )
    table_name = 'text'


class TextAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = utils.get_texts_data()
    serializer_class = TextSerializer
    permission_classes = (UserHavePermissionOrRead, )
    lookup_field = 'id'
    table_name = 'text'


class ImageListAPI(generics.ListCreateAPIView):
    queryset = utils.get_images_data()
    serializer_class = ImageSerializer
    permission_classes = (UserHavePermissionOrRead, )
    table_name = 'image'


class ImageAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = utils.get_images_data()
    serializer_class = ImageSerializer
    permission_classes = (UserHavePermissionOrRead, )
    lookup_field = 'id'
    table_name = 'image'


class CategoryListAPI(generics.ListCreateAPIView):
    queryset = utils.get_categories_data()
    serializer_class = CategorySerializer
    table_name = 'category'
