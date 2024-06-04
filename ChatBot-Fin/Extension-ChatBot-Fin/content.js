const currentUrl = window.location.href.toString();

console.log(currentUrl.toString());

const textContent = document.body.innerText;
const encodedContent = encodeURIComponent(textContent);

fetch(`http://127.0.0.1:8000/input_webtext/?textContent=${encodedContent}`, { method: "POST" })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });

function clear() {
    const response = document.getElementById('respons');
    const sourceurls = document.getElementById('source_urls');

    response.innerHTML = "";
    sourceurls.innerHTML = "";
    fetch(`http://127.0.0.1:8000/clear_messages/`, { method: "POST" })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
}

const textbox = document.createElement("input");

function get_chat_response(question) {
    const response = document.getElementById('respons');

    const your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
    response.appendChild(your_question);

    const loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
    document.getElementById("respons").appendChild(loading);

    const request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;

    question = encodeURI(question);

    fetch(`http://127.0.0.1:8000/get_chat_response/?question=${question}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);

            response.removeChild(loading);

            const resptext = document.createElement('span');
            resptext.innerText = "FinGPT: " + data["resp"] + "\n";
            document.getElementById("respons").appendChild(resptext);
            textbox.value = "";
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        });
}

let searchQuery = "";

let popup;

function get_adv_chat_response(question) {
    popup.appendChild(sources);
    const response = document.getElementById('respons');
    searchQuery = question

    const your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
    response.appendChild(your_question);

    const loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
    document.getElementById("respons").appendChild(loading);

    const request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;

    fetch(`http://127.0.0.1:8000/get_adv_response/?question=${question}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);

            response.removeChild(loading);

            const resptext = document.createElement('span');
            resptext.innerText = "FinGPT: " + data["resp"] + "\n";
            document.getElementById("respons").appendChild(resptext);
            textbox.value = "";
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        });
}

const sitebody = document.body;

function get_sources(search_query) {
    sources_window.style.display = 'block';
    console.log(search_query);

    sitebody.append(sources_window);
    const response = document.getElementById('respons');
    console.log("hi1");

    fetch(`http://127.0.0.1:8000/get_source_urls/?query=${String(search_query)}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);
            console.log("HIIII2");
            const sources = data["resp"];
            const source_urls = document.getElementById('source_urls');
            source_urls.innerText = '';

            sources.forEach(source => {
                const url = source[0];
                const icon_url = source[1];
                const link = document.createElement('a');
                link.href = url;
                link.innerText = url;
                link.target = "_blank";

                const container = document.createElement('div');
                container.style.display = "flex";
                container.style.alignItems = "center";

                const icon = document.createElement('img');
                icon.src = icon_url;
                icon.alt = "Icon";
                icon.style.width = "16px";
                icon.style.height = "16px";
                icon.style.marginRight = "5px";

                container.appendChild(icon);
                container.appendChild(link);

                source_urls.appendChild(container);
            });
        });
}


popup = document.createElement('div');
popup.id = "draggableElement";

const header = document.createElement('div');
header.id = "header";

const title = document.createElement('span');
title.innerText = "FinGPT";

// Used for Dark mode and other settings, not implemented yet
const settingsIcon = document.createElement('span');
settingsIcon.innerText = "⚙️";
settingsIcon.className = "icon";

const closeIcon = document.createElement('span');
closeIcon.innerText = "❌";
closeIcon.className = "icon";
closeIcon.onclick = function() { popup.style.display = 'none'; };

header.appendChild(title);
header.appendChild(settingsIcon);
header.appendChild(closeIcon);

const content = document.createElement('div');
content.id = "content";

const titleText = document.createElement('h2');
titleText.innerText = "Your personalized financial assistant.";

const subtitleText = document.createElement('p');
subtitleText.innerText = "Here are some quick functions to get you started:";

content.appendChild(titleText);
content.appendChild(subtitleText);

const inputContainer = document.createElement('div');
inputContainer.id = "inputContainer";

textbox.type = "text";
textbox.placeholder = "Ask me something!";

const sendButton = document.createElement('button');
sendButton.innerText = "➡️";
sendButton.onclick = function() { get_chat_response(textbox.value) };

inputContainer.appendChild(textbox);
inputContainer.appendChild(sendButton);

popup.appendChild(header);
popup.appendChild(content);
popup.appendChild(inputContainer);

sitebody.appendChild(popup);

popup = document.getElementById("draggableElement");
let isDragging = false;
let offsetX, offsetY;

function onMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - popup.getBoundingClientRect().left;
    offsetY = event.clientY - popup.getBoundingClientRect().top;
}

function onMouseMove(event) {
    if (isDragging) {
        const newX = event.clientX - offsetX;
        const newY = event.clientY - offsetY;

        popup.style.left = newX + "px";
        popup.style.top = newY + "px";
    }
}

function onMouseUp() {
    isDragging = false;
}

popup.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

document.addEventListener('mousemove', function(e) {
    if (isDragging) {
        const newX = e.clientX - offsetX;
        const newY = e.clientY - offsetY;

        popup.style.left = newX + "px";
        popup.style.top = newY + "px";
    }
});

function respond() {
    question = textbox.value;
    response.innerText = "You asked: " + question;
}
