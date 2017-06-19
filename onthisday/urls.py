from django.conf.urls import url

from . import views

urlpatterns = [
  url(r'^$', views.index, name='index'),
  url(r'^ajax/handleAT/$', views.handleAT, name='handleAT'),
  url(r'^ajax/getMessages/$', views.getMessages, name='getMessages')
]
