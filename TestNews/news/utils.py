from django.db.models import Prefetch, Max

from news.models import Article, Section, Text, Image, Category


def get_all_published_article():
    return Article.objects.select_related('category').filter(is_published=True)


def get_published_articles_with_full_sections_data():
    return Article.objects.filter(is_published=True).prefetch_related(
                   Prefetch('section_set',
                            queryset=Section.objects.order_by('queue').prefetch_related(
                                Prefetch('text_set', queryset=Text.objects.order_by('queue'), to_attr='texts'),
                                Prefetch('image_set', queryset=Image.objects.order_by('queue'), to_attr='images'))
                            )).select_related('category')


def get_full_sections_data():
    return Section.objects.all().prefetch_related(
        Prefetch('text_set', queryset=Text.objects.order_by('queue'), to_attr='texts'),
        Prefetch('image_set', queryset=Image.objects.order_by('queue'), to_attr='images')
    ).select_related('article')


def get_section_max_queue_value(article: Article) -> int:
    max_exist_article_sections_queue = Section.objects.filter(article__pk=article.id
                                                              ).aggregate(Max('queue'))['queue__max']
    return max_exist_article_sections_queue if max_exist_article_sections_queue else 1


def get_sections_data():
    return Section.objects.all()


def get_texts_data():
    return Text.objects.all()


def get_images_data():
    return Image.objects.all()


def get_categories_data():
    return Category.objects.all()


class SectionContent:
    def create(self, validated_data):
        section = Section.objects.prefetch_related(
            Prefetch('text_set', queryset=Text.objects.only('queue'), to_attr='texts'),
            Prefetch('image_set', queryset=Image.objects.only('queue'), to_attr='images')
        ).get(pk=validated_data['section'].id)
        section_content_queue = [*[image.queue for image in section.images], *[text.queue for text in section.texts]]
        if section_content_queue:
            validated_data['queue'] = max(section_content_queue) + 1
        else:
            validated_data['queue'] = 1
        return super().create(validated_data)
