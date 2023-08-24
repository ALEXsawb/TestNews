from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from news.views import AllNews, ArticleAPI, SectionAPI, TextAPI, ImageAPI, SectionListAPI, TextListAPI, ImageListAPI, \
    CategoryListAPI

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('news/', AllNews.as_view(), name='news'),
    path('news/sections/', SectionListAPI.as_view(), name='sections'),
    path('news/texts/', TextListAPI.as_view(), name='texts'),
    path('news/images/', ImageListAPI.as_view(), name='images'),
    path('news/categories/', CategoryListAPI.as_view(), name='categories'),
    path('news/<str:slug>/', ArticleAPI.as_view(), name='article'),
    path('news/sections/<int:id>/', SectionAPI.as_view(), name='section'),
    path('news/texts/<int:id>/', TextAPI.as_view(), name='texts'),
    path('news/images/<int:id>/', ImageAPI.as_view(), name='images'),
]