import os
from dotenv import load_dotenv
import openai
"""
Takes user input which can be a fairly long string, and returns
a list of a few(1 to 5) of the key words(strings) found in the string in order
to help with search querying
"""
def get_keywords(user_input:str) -> list:
    # Get the API key to use GPT 3.5
    load_dotenv()
    openai.api_key = os.getenv("API_KEY7")
    # Using GPT 3.5, find the keywords of the user's request
    completion = openai.ChatCompletion.create(
        model = "gpt-3.5-turbo",
        messages = [{"role": "system", "content": "You return all the keywords from this request seperated by a comma only?:\n" + user_input}]
    )
    print(completion.choices[0].message.content)
    keyWords = completion.choices[0].message.content.split(",")
    print(keyWords)
    return keyWords

if __name__ == "__main__":
    user = input("Hello! How can I help you? ").strip()
    get_keywords(user)