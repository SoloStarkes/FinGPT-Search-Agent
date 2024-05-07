function uploadFile() {
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('File uploaded successfully');
        } else {
            console.error('Failed to upload file');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function sendQuestion() {
    var userInput = document.getElementById('userInput').value;

    fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question: userInput })
    })
    .then(response => response.json())
    .then(data => {
        displayResponse(data.answer);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayResponse(response) {
    var chatMessages = document.getElementById('chatMessages');
    var messageElement = document.createElement('div');
    messageElement.textContent = response;
    chatMessages.appendChild(messageElement);
}
