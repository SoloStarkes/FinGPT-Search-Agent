import os
from dotenv import load_dotenv
import openai
'''
Use GPT-3.5 API to generate response from the user input. We will be 
using "Retrieval Augmented Generation" to add the context of the scraping 
the "get_urls" and "clean_urls" modules will return.

Input will be a string(user input) and a list of maps(data) of the form {URL:text}.
The output should be a string.
'''
def generate_response(user_input:str, data:dict) -> str:
    load_dotenv()
    openai.api_key = os.getenv("API_KEY7")
    # Using GPT 3.5, generate a response based on the user's request
    completion = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [{"role": "user", "content": user_input}] + [{"role": "system", "content": data[url]} for url in data]
    )
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

if __name__ == "__main__":
    pass