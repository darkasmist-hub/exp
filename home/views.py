from django.shortcuts import render, HttpResponse
from datetime import datetime
# At the top of your views.py
from .models import sign as SignModel  # Alias it to avoid conflict

# Create your views here.
def index(request):
  return render(request, 'index.html',)

def sign(request): 
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # Use the Model name here, NOT the function name
        new_sign = SignModel(
            username=username, 
            email=email, 
            password=password, 
            date=datetime.today()
        )
        new_sign.save()

    return render(request, 'sign.html')

def jobs(request):
  return render(request, 'jobs.html')

def contact(request):
  return render(request, 'contact.html')

def services(request):
  return render(request, 'services.html')