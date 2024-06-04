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


//making text box for popup
const textbox = document.createElement("input");
textbox.id = "textbox";

function get_chat_response(question) {

  
  // Define the 'response' element 
    const response = document.getElementById('respons');

    // Create a 'span' element to display the user's question
    const your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
  response.appendChild(your_question);

  // Create a 'span' element for the loading message
    const loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
  document.getElementById("respons").appendChild(loading);

  // Create the 'request' object
    const request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
  

  question = encodeURI(question);


  fetch(`http://127.0.0.1:8000/get_chat_response/?question=${question}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
      console.log(data["resp"]);

      // Log the URL to the console
      

      // Remove the loading message
      response.removeChild(loading);
      
      // Append the response to the 'response' element
      resptext = document.createElement('span');
      resptext.innerText = "FinGPT: " + data["resp"] + "\n";
      document.getElementById("respons").appendChild(resptext);
      textbox.value = "";
      document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
    })

}

let searchQuery = "";

let popup = document.createElement('span');
popup.id = "draggableElement";

//making button for sources
const sources = document.createElement('span');
sources.id = "sources";
sources.innerText = "Sources";
sources.onclick = function() {get_sources(searchQuery)};

function get_adv_chat_response(question) {
  
  popup.appendChild(sources);
  // Define the 'response' element 
    const response = document.getElementById('respons');
    searchQuery = question
  // Create a 'span' element to display the user's question
    const your_question = document.createElement('span');
    your_question.innerText = "You: " + question + "\n";
  response.appendChild(your_question);

  // Create a 'span' element for the loading message
    const loading = document.createElement('span');
    loading.innerText = "FinGPT: Loading...";
  document.getElementById("respons").appendChild(loading);

  // Create the 'request' object
    const request = {"question": question};
    document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;


  


  fetch(`http://127.0.0.1:8000/get_adv_response/?question=${question}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
      console.log(data["resp"]);

      
      
      
      
      // Remove the loading message
      response.removeChild(loading);
      
      // Append the response to the 'response' element
      resptext = document.createElement('span');
      resptext.innerText = "FinGPT: " + data["resp"] + "\n";
      document.getElementById("respons").appendChild(resptext);
      textbox.value = "";
      document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
    })

}

const sitebody = document.body;

const sources_window = document.createElement('span');
sources_window.className = "sources-window";

function get_sources(search_query) {
  sources_window.style.display = 'block';
  console.log(search_query);

  sitebody.append(sources_window);
    const response = document.getElementById('respons');
    console.log("Getting sources");

  fetch(`http://127.0.0.1:8000/get_source_urls/?query=${String(search_query)}`, { method: "GET" })
      .then(response => response.json())
      .then(data => {
          console.log(data["resp"]);

          console.log("Fetching...");
          const sources = data["resp"];
          const source_urls = document.getElementById('source_urls');
          source_urls.innerText = '';
          // Loop through each source and create a clickable link
          sources.forEach(source => {
              const url = source[0];
              const icon_url = source[1];
              const link = document.createElement('a');
              link.href = url;
          link.innerText = url;
          link.target = "_blank"; // Open link in a new tab

          // Create a container div for the icon and the link
              const container = document.createElement('div');
              container.style.display = "flex"; // Use flexbox for layout
          container.style.alignItems = "center"; // Center items vertically

          // Create an image element for the icon
              const icon = document.createElement('img');
              icon.src = icon_url;
          icon.alt = "Icon";
          icon.style.width = "16px"; // Set the icon size
          icon.style.height = "16px";
          icon.style.marginRight = "5px"; // Add some spacing between the icon and the link

    // Append the icon and the link to the container
    container.appendChild(icon);
    container.appendChild(link);

    // Append the container to the source_urls element
    source_urls.appendChild(container);
});

      });
}


let text = document.createElement('span');
text.id = "text";
text.innerText = "Ask me question.";

let response = document.createElement('span');
response.id = "respons";
response.innerText = "";

let confirm_button = document.createElement('span');
confirm_button.id = "confirm_button";
confirm_button.innerText = "Ask";
confirm_button.onclick = function() {get_chat_response(textbox.value)};

let clear_button = document.createElement('span');
clear_button.id = "clear_button";
clear_button.innerText = "Clear";
clear_button.onclick = function() {clear()};

let adv_button = document.createElement('span');
adv_button.id = "adv_button";
adv_button.innerText = "Advanced Ask";
adv_button.onclick = function() {get_adv_chat_response(textbox.value)};

let exit_sources = document.createElement('span');
exit_sources.id = "exit_sources";
exit_sources.innerText = "Exit";
exit_sources.onclick = function() { sources_window.style.display = 'none'; };

popup.appendChild(textbox);
popup.appendChild(confirm_button);
popup.appendChild(clear_button);
popup.appendChild(text);
popup.appendChild(response);
popup.appendChild(adv_button);


let source_urls = document.createElement('span');
source_urls.id = "source_urls";

sources_window.appendChild(source_urls);
sources_window.appendChild(exit_sources);

sitebody.appendChild(popup)
//sitebody.append(sources_window)

popup = document.getElementById("draggableElement");
let isDragging = false;
let offsetX, offsetY;

// Function to handle the mouse down event
function onMouseDown(event) {
  isDragging = true;
  offsetX = event.clientX - popup.getBoundingClientRect().left;
  offsetY = event.clientY - popup.getBoundingClientRect().top;
}

// Function to handle the mouse move event
function onMouseMove(event) {
  if (isDragging) {
      const newX = event.clientX - offsetX;
      const newY = event.clientY - offsetY;

      popup.style.left = newX + "px";
    popup.style.top = newY + "px";
  }
}

// Function to handle the mouse up event
function onMouseUp() {
  isDragging = false;
}

// Add event listeners for mouse events
popup.addEventListener("mousedown", onMouseDown);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", onMouseUp);

document.addEventListener('mousemove', function(e) {
  if (isDragging) {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      popup.style.left = newX + "px";
    popup.style.top = newY + "px";

    // Update the position of the sources window
      const sourcesWindowLeft = newX + parseInt(popup.style.width) + 10;
      const sourcesWindowTop = newY;
      sources_window.style.left = sourcesWindowLeft + "px";
    sources_window.style.top = sourcesWindowTop + "px";
  }
});


function respond() {
    question = textbox.value;
    response.innerText = "You asked: " + question;
}



