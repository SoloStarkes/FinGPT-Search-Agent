from dotenv import load_dotenv
load_dotenv()

import time 


import requests
from bs4 import BeautifulSoup

import os
import openai

from googlesearch import search
from urllib.parse import quote_plus

api_key = os.getenv("API_KEY7")


    
def data_scrape(url, timeout=1):

    try:
        start_time = time.time()
        response = requests.get(url, timeout=timeout)
        end_time = time.time()
        elapsed_time = end_time - start_time
        
        if response.status_code == 200:
            print("Successful response")
            if elapsed_time > timeout:
                print("Request took more than 2 seconds. Skipping...")
                return -1
            soup = BeautifulSoup(response.text, 'html.parser')
            first_5000_characters = soup.text[:4000]
        

            return first_5000_characters
        else:
            print('Failed to retrieve the page. Status code:', response.status_code)
            return -1
    except requests.exceptions.Timeout:
        print('Request timed out after', timeout, 'seconds. Skipping...')
        return -1
    except Exception as e:
        print('An error occurred:', str(e))
        return -1




def search_websites_with_keyword(keyword):
    # Define the search query
    search_query = f"intitle:{keyword}"  # This query searches for "rpi" in the title of web pages

    # Send a GET request to Google Search with the query
    search_url = f"https://www.google.com/search?q={search_query}"
    headers = {"User-Agent": "Your User Agent Here"}  # Replace with your User-Agent header
    response = requests.get(search_url, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the HTML content of the search results page
        soup = BeautifulSoup(response.text, "html.parser")

        # Find and extract search result links
        search_results = soup.find_all("a")
        for result in search_results:
            link = result.get("href")
            if link and link.startswith("/url?q="):
                # Extract the actual URL from the Google search result link
                url = link[7:]  # Remove "/url?q=" prefix
                info = data_scrape(url)
                if (info != -1):
                    message_list.append( {"role": "system", "content": info})

                



                # You can further process this URL or send a request to scrape data from the website

    else:
        print("Failed to retrieve search results.")







def create_advanced_response(user_input, message_list):
    
    print(message_list)
    openai.api_key = api_key
    print("starting creation") 
    #urls = get_goog_urls(user_input)
    for url in search(user_input, num=10, stop=10, pause =0):
        info = data_scrape(url)
        if (info != -1):
            print(info)
            message_list.append( {"role": "system", "content": "url: " + url + "info: " + data_scrape(url)})
    

    message_list.append( {"role": "user", "content": user_input}) 
    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=message_list,
        
    )
    print(completion.choices[0].message.content)
   
    
    return completion.choices[0].message.content


def create_response(user_input, message_list):
    print(message_list)
    openai.api_key = api_key
    print("starting creation") 
    
    

    message_list.append( {"role": "user", "content": user_input}) 

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=message_list,
        
    )

    print(completion.choices[0].message.content)
   
    message_list.append({"role": "system", "content": completion.choices[0].message.content})

    return completion.choices[0].message.content

# def clear(request): 
#     message_list = []
#     print("cleared")
#     return 

def get_sources(query):
    query_bytes = query.encode('utf-8')  # Encode query to bytes
    print("query is ", query_bytes)
    sources = []
    for url in search(quote_plus(query_bytes), num=10, stop=10, pause=0):
        info = data_scrape(url)
        if info != -1:
            sources.append(url)
            print(url)
    return sources
# def get_goog_urls(search_query):
#     urls = []
#     for url in search(search_query, num=10, stop=10, pause=2):
#         print("dog")
#         urls.append(url)
#     return urls 

    
