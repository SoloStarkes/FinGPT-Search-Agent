function fetchAPI(url, method = "GET", body = null) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        });
}

function getChatResponse(question) {
    const response = document.getElementById('respons');
    appendElement(response, 'span', `You: ${question}\n`);

    const loading = createElement('span', {}, "FinGPT: Loading...");
    response.appendChild(loading);

    fetchAPI(`http://127.0.0.1:8000/get_chat_response/?question=${encodeURIComponent(question)}`)
        .then(data => {
            response.removeChild(loading);
            appendElement(response, 'span', `FinGPT: ${data.resp}\n`);
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        })
        .catch(error => console.error('Fetch error:', error));
}

function getAdvChatResponse(question) {
    const response = document.getElementById('respons');
    searchQuery = question;
    appendElement(response, 'span', `You: ${question}\n`);

    const loading = createElement('span', {}, "FinGPT: Loading...");
    response.appendChild(loading);

    fetchAPI(`http://127.0.0.1:8000/get_adv_response/?question=${encodeURIComponent(question)}`)
        .then(data => {
            response.removeChild(loading);
            appendElement(response, 'span', `FinGPT: ${data.resp}\n`);
            document.getElementById("respons").scrollTop = document.getElementById("respons").scrollHeight;
        })
        .catch(error => console.error('Fetch error:', error));
}

function getSources(searchQuery) {
    const sourcesWindow = document.querySelector('.sources-window');
    sourcesWindow.style.display = 'block';

    fetchAPI(`http://127.0.0.1:8000/get_source_urls/?query=${encodeURIComponent(searchQuery)}`)
        .then(data => {
            const sourceUrls = document.getElementById('source_urls');
            sourceUrls.innerHTML = '';

            data.resp.forEach(source => {
                const [url, iconUrl] = source;
                const container = createElement('div', { display: 'flex', alignItems: 'center' });

                const icon = createElement('img', { src: iconUrl, alt: 'Icon', width: '16px', height: '16px', marginRight: '5px' });
                const link = createElement('a', { href: url, target: '_blank' }, url);

                container.append(icon, link);
                sourceUrls.appendChild(container);
            });
        })
        .catch(error => console.error('Fetch error:', error));
}

function clear() {
    document.getElementById('respons').innerHTML = "";
    document.getElementById('source_urls').innerHTML = "";

    fetchAPI(`http://127.0.0.1:8000/clear_messages/`, "POST")
        .then(data => console.log(data))
        .catch(error => console.error('Fetch error:', error));
}
