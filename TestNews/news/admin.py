from django.contrib import admin

from news.models import Article, Section, Category, Image, Text

admin.site.register(Article, )
admin.site.register(Section, )
admin.site.register(Category,)
admin.site.register(Image, )
admin.site.register(Text, )