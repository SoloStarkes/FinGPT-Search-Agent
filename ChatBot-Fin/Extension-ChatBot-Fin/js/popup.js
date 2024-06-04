document.addEventListener('DOMContentLoaded', () => {
    createPopup();
    createSourcesWindow();
});

function createPopup() {
    const popup = document.createElement('span');
    popup.id = "draggableElement";

    const text = createElement('span', { width: '80%', height: '10%', top: '5%', left: '10%' }, "Ask me question.");
    const response = createElement('span', { width: '80%', height: '50%', top: '15%', left: '10%' }, "");
    response.id = "respons";
    const textbox = createElement('input', { width: '80%', height: '5%', top: '75%', left: '10%' });
    textbox.type = "text";
    const confirmButton = createButton("Ask", { width: '20%', height: '7%', top: '85%', left: '10%' }, () => getChatResponse(textbox.value));
    const clearButton = createButton("Clear", { width: '30%', height: '4%', top: '92%', left: '35%' }, clear);
    const advButton = createButton("Advanced Ask", { width: '20%', height: '7%', top: '85%', left: '70%' }, () => getAdvChatResponse(textbox.value));
    const sourcesButton = createButton("Sources", { width: '20%', height: '6%', top: '85%', left: '40%' }, () => getSources(searchQuery));

    popup.append(textbox, confirmButton, clearButton, text, response, advButton, sourcesButton);
    document.body.appendChild(popup);

    addDragFunctionality(popup);
}

function createSourcesWindow() {
    const sourcesWindow = createElement('span', { width: '300px', height: '500px', top: '10%', left: '500px' });
    sourcesWindow.classList.add('sources-window');

    const sourceUrls = createElement('span', { width: '80%', height: '50%', top: '15%', left: '10%' }, "");
    sourceUrls.id = "source_urls";

    const exitSourcesButton = createButton("Exit", { width: '50%', height: '7%', top: '85%', left: '25%' }, () => sourcesWindow.style.display = 'none');

    sourcesWindow.append(sourceUrls, exitSourcesButton);
    document.body.appendChild(sourcesWindow);
}
