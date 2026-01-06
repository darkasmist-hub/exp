from django.contrib import admin
from django.urls import path
from home import views 

urlpatterns = [
  path("", views.index, name="home"),
  path("index", views.index, name="index"),
  path("sign", views.sign, name="sign"),
  path("contact", views.contact, name="contact"),
  path('services', views.services, name='services'),
  path("jobs" ,views.jobs, name = "jobs")
]