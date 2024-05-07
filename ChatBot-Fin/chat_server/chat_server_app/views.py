from django.shortcuts import render
from django.http import JsonResponse
import json
import random  # Import 'random' for 'randint'
import datascraper.datascraper as ds  # Import 'datascraper'
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse


message_list=[
    {"role": "system", "content": "You are a helpful assistant. Always answer questions to the best of your ability with the information you have."},
  ]

# View to return a random number as JSON
def Get_A_Number(request):
    int_response = random.randint(0, 99)
    return JsonResponse({'resp': int_response})

# View to handle chat responses

def chat_response(request):
    # Assuming 'create_response' returns a string
    question = request.GET.get('question', '')
    print("question is: " ,question)
    #message_list.append( {"role": "user", "content": question})
    #print(request.body)
    message_response = ds.create_response(question, message_list)
    print(message_list)
    return JsonResponse({'resp': message_response})

# View to handle appending the site's text to the message list initiliatlly 
@csrf_exempt
def add_webtext(request):

    textContent = request.GET.get('textContent', '')
    
    #text = ds.data_scrape(weburl)
    #print(weburl)
    print(textContent)

    message_list.append( {"role": "system", "content": textContent})
    return JsonResponse({'resp': 'Text added successfully'})  # Return a JsonResponse

    #return JsonResponse({'resp1': text})

@csrf_exempt
def adv_response(request):
    question = request.GET.get('question', '')
    message_response = ds.create_advanced_response(question, message_list)

    return JsonResponse({'resp': message_response})

@csrf_exempt
def clear(request):
    print("initial message_list = " + str(message_list))
    message_list.clear()
    
    
    return JsonResponse({'resp': 'Cleared message list sucessfully' + str(message_list)})  # Return a JsonResponse

@csrf_exempt
def get_sources(request):

    query = request.GET.get('query', '')
    query = str(query)
    print(type(query))
    print("views query is ", query)
    sources = ds.get_sources(query)

    return JsonResponse({'resp': sources})  # Return a JsonResponse

@csrf_exempt
def get_logo(request):

    url = request.Get.get('url', '')

    logo_src = ds.get_website_icon(url)
    return JsonResponse({'resp', logo_src})

# def get_goog_urls(request):

#     search_query = request.GET.get('query', '')
    
#     list_urls = ds.get_goog_urls(search_query)
#     return JsonResponse({'resp': list_urls})
 

