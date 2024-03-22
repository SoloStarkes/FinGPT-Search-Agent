# Chatbot-Extension-Research
## How To Use
### Installing the extension
- On google chrome, navigate to `Extensions` to the right of the search bar at the top
- Click `Manage Extensions`
- To the left, you should see a `load unpacked` button, click it and navigate to the repo
- Once you reach the repo, select the `Extension-ChatRPI` folder and click `Select Folder`
- You should now have the extension on your local device. To get it up and running, simply navigate to a website with the domain `rpi.edu` and the extension should appear
### Running the chatbot
- Navigate to `resources` folder then go to `dependencies.txt`
- Install all dependencies using `pip` command in terminal
- Going back to the beginning of the repo, `cd` in to `chat_server`
- Run `manage.py` using the `runserver` command (For example, I have python installed on WSL, so I type `python manage.py runserver`)
- Go to the extension and ask your question!
