from django.core.validators import MinValueValidator
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Article(models.Model):
    slug = models.SlugField(max_length=100, db_index=True, unique=True, verbose_name='URL')
    title = models.CharField(max_length=250)
    is_published = models.BooleanField(default=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-id']


class Section(models.Model):
    queue = models.IntegerField(validators=[MinValueValidator(0)])
    header = models.CharField(max_length=150)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)

    def __str__(self):
        return self.header

    class Meta:
        ordering = ['-article__id', '-id', 'queue']


class Image(models.Model):
    queue = models.IntegerField(validators=[MinValueValidator(0)])
    context = models.CharField(max_length=150, verbose_name='text under img', null=True)
    img = models.ImageField()
    section = models.ForeignKey(Section, on_delete=models.CASCADE)


class Text(models.Model):
    queue = models.IntegerField(validators=[MinValueValidator(0)])
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    text = models.CharField(max_length=750)
