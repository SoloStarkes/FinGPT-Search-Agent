from bs4 import BeautifulSoup
import requests
"""
Takes an array of urls, goes through each one, then sift through this HTML data
to get the actual article contents as a nice string.

This should return a list of maps, where the key is the URL and the value
is the text in a reasonably formatted manner.
"""
def clean_urls(urls:list) -> dict:
    data = dict()
    for url in urls:
        response = requests.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, "html.parser")
            # Find and extract search result links
            search_results = soup.find_all("p")
            text = ""
            for result in search_results:
                text += result.get_text() + "\n"
            data[url] = text
        else:
            print("Failed to retrieve search results.")
    return data

if __name__ == "__main__":
    pass