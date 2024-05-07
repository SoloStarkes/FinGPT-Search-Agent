# FinGPT-Search-Agent

Vision: This is a search agent specifically tailored towards the financial domain that can educate the user with any topic relating to finance, and direct the user towards accurate and reliable information by providing the user with the sources that the agent used to generate its response.

1. A search agent that provides financial commentary, analysis, and news on stocks, ETFs, mutual funds, and other investment instruments. Will function as a place where users want to find financial related information.
2. Can provide precise answers in question-answering systems by considering the full context, outperforming traditional search engines. It's a powerful search and retrieval engine that can quickly locate relevant financial information from various sources, such as reports, filings, and databases.
3. With every generated response, it will essentially cite the sources from which it got the information from, all while ensuring that the sources that the agent pulls information from is reliable and accurate.
4. Ensure the system can accurately parse and extract data from XBRL (eXtensible Business Reporting Language) documents, which are commonly used for financial reporting.
5. Can act as a "Robo-Advisor" for users that want advice or suggestions on topics or situations.

Current Progress: 

1. Regular "ask" can see what's on the current page and give it to the model
  ![image](https://github.com/SoloStarkes/FinGPT-Search-Agent/assets/139386263/acc6a83d-7923-49f9-8621-6920af1099df)

2. Advanced ask which gives the model a better response to the information because it uses current information (financial and otherwise) from sources
   ![image](https://github.com/SoloStarkes/FinGPT-Search-Agent/assets/139386263/ef82f5a1-d927-4500-ae65-532bce03de1f)

3. Sources. Sources are very important and helps reduce hallucations as well as help the user see the sourced information on their own.
  ![image](https://github.com/SoloStarkes/FinGPT-Search-Agent/assets/139386263/38a71dd3-56af-47f8-a56d-a8a269534212)


How to install locally for yourself! 

1. First clone the repo into a directory.
2. Install the necessary dependicies as shown in the dependencies.txt file 
3. Go to extensions on a google browser and select developer mode
4. Click load unpakced and navigate to the folder called "Extension-ChatBot-Fin"
5. Select and load it, and then navigate to a financial website, bloomberg and yahoo finance work for now
6. Go to the terminal and navigate to chat_server
7. Run the command "python manage.py runserver"  or "python3 manage.py runserver" if using python3
8. Enjoy the functionality of the chatbot on your local server
   
Immediate Next Steps:

1. Fixing the UI to be more readable to be user instead of clunky buttons
2. Display sources more aesthically and naturally 
3. Be able to minimize and maximize the chatbot
4. Increase speed of response by improving datascraping
   


Overarching Next Steps:
1. Test with different models like llama 
2. Be able to show the specific sources the model used
3. Show the sources in a way like perplexity does
4. Add more financial sources and possibly have a database of information read to use and can be regularly updated.
   
