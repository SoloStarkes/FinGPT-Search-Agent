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
    var response = document.getElementById('respons');
    var sourceurls = document.getElementById('source_urls');

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

function get_chat_response(question) {
    var response = document.getElementById('respons');

    var your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
    response.appendChild(your_question);

    var loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
    document.getElementById("respons").appendChild(loading);

    var request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;

    question = encodeURI(question);

    fetch(`http://127.0.0.1:8000/get_chat_response/?question=${question}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);

            response.removeChild(loading);

            var resptext = document.createElement('span');
            resptext.innerText = "FinGPT: " + data["resp"] + "\n";
            document.getElementById("respons").appendChild(resptext);
            textbox.value = "";
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        });
}

var searchQuery = ""
function get_adv_chat_response(question) {
    popup.appendChild(sources);
    var response = document.getElementById('respons');
    searchQuery = question

    var your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
    response.appendChild(your_question);

    var loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
    document.getElementById("respons").appendChild(loading);

    var request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;

    fetch(`http://127.0.0.1:8000/get_adv_response/?question=${question}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);

            response.removeChild(loading);

            var resptext = document.createElement('span');
            resptext.innerText = "FinGPT: " + data["resp"] + "\n";
            document.getElementById("respons").appendChild(resptext);
            textbox.value = "";
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        });
}

function get_sources(search_query) {
    sources_window.style.display = 'block';
    console.log(search_query);

    sitebody.append(sources_window);
    var response = document.getElementById('respons');
    console.log("hi1");

    fetch(`http://127.0.0.1:8000/get_source_urls/?query=${String(search_query)}`, { method: "GET" })
        .then(response => response.json())
        .then(data => {
            console.log(data["resp"]);
            console.log("HIIII2");
            const sources = data["resp"];
            var source_urls = document.getElementById('source_urls');
            source_urls.innerText = '';

            sources.forEach(source => {
                var url = source[0];
                var icon_url = source[1];
                var link = document.createElement('a');
                link.href = url;
                link.innerText = url;
                link.target = "_blank";

                var container = document.createElement('div');
                container.style.display = "flex";
                container.style.alignItems = "center";

                var icon = document.createElement('img');
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

var sitebody = document.body;

var popup = document.createElement('span');
popup.id = "draggableElement";

var text = document.createElement('span');
text.id = "text";
text.innerText = "Ask me question.";

var response = document.createElement('span');
response.id = "respons";
response.innerText = "";

var textbox = document.createElement("input");
textbox.id = "textbox";

var confirm_button = document.createElement('span');
confirm_button.id = "confirm_button";
confirm_button.innerText = "Ask";
confirm_button.onclick = function() {get_chat_response(textbox.value)};

var clear_button = document.createElement('span');
clear_button.id = "clear_button";
clear_button.innerText = "Clear";
clear_button.onclick = function() {clear()};

var adv_button = document.createElement('span');
adv_button.id = "adv_button";
adv_button.innerText = "Advanced Ask";
adv_button.onclick = function() {get_adv_chat_response(textbox.value)};

var sources = document.createElement('span');
sources.id = "sources";
sources.innerText = "Sources";
sources.onclick = function() {get_sources(searchQuery)};

var exit_sources = document.createElement('span');
exit_sources.id = "exit_sources";
exit_sources.innerText = "Exit";
exit_sources.onclick = function() { sources_window.style.display = 'none'; };

popup.appendChild(textbox);
popup.appendChild(confirm_button);
popup.appendChild(clear_button);
popup.appendChild(text);
popup.appendChild(response);
popup.appendChild(adv_button);

var sources_window = document.createElement('span');
sources_window.className = "sources-window";

var source_urls = document.createElement('span');
source_urls.id = "source_urls";

sources_window.appendChild(source_urls);
sources_window.appendChild(exit_sources);

sitebody.appendChild(popup);

var popup = document.getElementById("draggableElement");
var isDragging = false;
var offsetX, offsetY;

function onMouseDown(event) {
    isDragging = true;
    offsetX = event.clientX - popup.getBoundingClientRect().left;
    offsetY = event.clientY - popup.getBoundingClientRect().top;
}

function onMouseMove(event) {
    if (isDragging) {
        var newX = event.clientX - offsetX;
        var newY = event.clientY - offsetY;

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
        var newX = e.clientX - offsetX;
        var newY = e.clientY - offsetY;

        popup.style.left = newX + "px";
        popup.style.top = newY + "px";

        var sourcesWindowLeft = newX + parseInt(popup.style.width) + 10;
        var sourcesWindowTop = newY;
        sources_window.style.left = sourcesWindowLeft + "px";
        sources_window.style.top = sourcesWindowTop + "px";
    }
});

function respond() {
    question = textbox.value;
    response.innerText = "You asked: " + question;
}
