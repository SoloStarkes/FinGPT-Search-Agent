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

  
  // Define the 'response' element 
  var response = document.getElementById('respons');

  // Create a 'span' element to display the user's question
  var your_question = document.createElement('span');
  your_question.innerText = "You: " + question + "\n";
  response.appendChild(your_question);

  // Create a 'span' element for the loading message
  var loading = document.createElement('span');
  loading.innerText = "FinGPT: Loading...";
  document.getElementById("respons").appendChild(loading);

  // Create the 'request' object
  var request = {"question": question};
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

var searchQuery = ""
function get_adv_chat_response(question) {
  
  popup.appendChild(sources);
  // Define the 'response' element 
  var response = document.getElementById('respons');
  searchQuery = question
  // Create a 'span' element to display the user's question
  var your_question = document.createElement('span');
  your_question.innerText = "You: " + question + "\n";
  response.appendChild(your_question);

  // Create a 'span' element for the loading message
  var loading = document.createElement('span');
  loading.innerText = "FinGPT: Loading...";
  document.getElementById("respons").appendChild(loading);

  // Create the 'request' object
  var request = {"question": question};
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

function get_sources(search_query) {
  console.log(search_query)

  sitebody.append(sources_window)
  var response = document.getElementById('respons');
  console.log("hi1")
  fetch(`http://127.0.0.1:8000/get_source_urls/?query=${String(search_query)}`, { method: "GET" })
      .then(response => response.json())
      .then(data => {
          console.log(data["resp"]);

          console.log("HIIII2")
          const urls = data["resp"];
          var source_urls = document.getElementById('source_urls');
          source_urls.innerText = '';
          // Loop through each URL and create a clickable link
          urls.forEach(url => {
              var link = document.createElement('a');
              link.href = url;
              link.innerText = url;
              link.target = "_blank"; // Open link in a new tab
              link.style.display = "block"; // Display each link on a new line
              source_urls.appendChild(link);
          });
      })
}

var sitebody = document.body;

var popup = document.createElement('span');
popup.id = "draggableElement"; // Assign the ID "draggableElement"
// Get the current URL


//making the style
popup.style.textAlign = "center";
popup.style.position = "absolute";
popup.style.width = "300px";
popup.style.height = "490px";
popup.style.top = "10%";
popup.style.left = "10%";
popup.style.backgroundColor = "white";
popup.style.borderRadius = "15px";
popup.style.boxShadow = "5px 0px 10px black"
popup.style.overflowY = "auto";
popup.style.zIndex = "10000"; 
popup.style.color = "black";

//making text content for popup
var text = document.createElement('span');
text.style.position = "absolute";
text.style.width = "80%";
text.style.height = "10%";
text.style.top = "5%";
text.style.left = "10%";
text.innerText = "Ask me question.";

//making response text content for popup
var response = document.createElement('span');
response.style.overflowWrap = "break-word";
response.style.textAlign = "left";
response.style.border = "1px solid rgb(200,200,200)";
response.style.position = "absolute";
response.style.width = "80%";
response.style.height = "50%";
response.style.top = "15%";
response.style.left = "10%";
response.innerText = "";
response.style.overflowY = "auto";
response.style.display = "flex";
response.style.flexDirection = "column"
response.setAttribute("id","respons")

//making text box for popup
var textbox = document.createElement("input");
textbox.style.position = "absolute";  
textbox.style.width = "80%";
textbox.style.height = "5%";
textbox.style.top = "75%";
textbox.style.left = "10%";
textbox.style.zIndex = "1000";
textbox.type = "text"; 


//making button to confirm question
var confirm_button = document.createElement('span');
confirm_button.style.textAlign = "center";
confirm_button.style.position = "absolute";
confirm_button.style.width = "20%";
confirm_button.style.height = "7%";
confirm_button.style.top = "85%";
confirm_button.style.left = "10%";
confirm_button.innerText = "Ask";
confirm_button.style.backgroundColor = "grey";
confirm_button.style.borderRadius = "3px";
confirm_button.style.zIndex = "1000";
confirm_button.onclick = function() {get_chat_response(textbox.value)};
confirm_button.style.cursor = "pointer";

//making button to clear messages
var clear_button = document.createElement('span');
clear_button.style.textAlign = "center";
clear_button.style.position = "absolute";
clear_button.style.width = "30%";
clear_button.style.height = "4%";
clear_button.style.top = "92%";
clear_button.style.left = "35%";
clear_button.innerText = "Clear";
clear_button.style.backgroundColor = "grey";
clear_button.style.borderRadius = "3px";
clear_button.style.zIndex = "1001";
clear_button.onclick = function() {clear()};
clear_button.style.cursor = "pointer";

//making button to confirm adv_question
var adv_button = document.createElement('span');
adv_button.style.textAlign = "center";
adv_button.style.position = "absolute";
adv_button.style.width = "20%";
adv_button.style.height = "7%";
adv_button.style.top = "85%";
adv_button.style.left = "70%";
adv_button.innerText = "Advanced Ask";
adv_button.style.backgroundColor = "grey";
adv_button.style.borderRadius = "3px";
adv_button.style.zIndex = "1000";
adv_button.onclick = function() {get_adv_chat_response(textbox.value)};
adv_button.style.cursor = "pointer";


//making button for sources
var sources = document.createElement('span');
sources.style.textAlign = "center";
sources.style.position = "absolute";
sources.style.width = "20%";
sources.style.height = "6%";
sources.style.top = "85%";
sources.style.left = "40%";
sources.innerText = "Sources";
sources.style.backgroundColor = "green";
sources.style.borderRadius = "3px";
sources.style.zIndex = "1000";
sources.onclick = function() {get_sources(searchQuery)};
sources.style.cursor = "pointer";





popup.appendChild(textbox);
popup.appendChild(confirm_button);
popup.appendChild(clear_button);
popup.appendChild(text);
popup.appendChild(response);
popup.appendChild(adv_button);

var sources_window = document.createElement('span');
sources_window.style.textAlign = "center";
sources_window.style.position = "absolute";
sources_window.style.width = "300px";
sources_window.style.height = "500px";
sources_window.style.top = "10%";
sources_window.style.left =  "500px";
sources_window.style.backgroundColor = "white";
sources_window.style.borderRadius = "15px";
sources_window.style.boxShadow = "5px 0px 10px black"
sources_window.style.overflowY = "auto";
sources_window.style.zIndex = "10000"; 
sources_window.style.color = "black";


var source_urls = document.createElement('span');
source_urls.style.overflowWrap = "break-word";
source_urls.style.textAlign = "left";
source_urls.style.border = "1px solid rgb(200,200,200)";
source_urls.style.position = "absolute";
source_urls.style.width = "80%";
source_urls.style.height = "50%";
source_urls.style.top = "15%";
source_urls.style.left = "10%";
source_urls.innerText = "";
source_urls.style.overflowY = "auto";
source_urls.style.display = "flex";
source_urls.style.flexDirection = "column"
source_urls.setAttribute("id","source_urls")

sources_window.appendChild(source_urls);
sitebody.appendChild(popup)
//sitebody.append(sources_window)

var popup = document.getElementById("draggableElement");
var isDragging = false;
var offsetX, offsetY;

// Function to handle the mouse down event
function onMouseDown(event) {
  isDragging = true;
  offsetX = event.clientX - popup.getBoundingClientRect().left;
  offsetY = event.clientY - popup.getBoundingClientRect().top;
}

// Function to handle the mouse move event
function onMouseMove(event) {
  if (isDragging) {
    var newX = event.clientX - offsetX;
    var newY = event.clientY - offsetY;

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
    var newX = e.clientX - offsetX;
    var newY = e.clientY - offsetY;
    
    popup.style.left = newX + "px";
    popup.style.top = newY + "px";

    // Update the position of the sources window
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



