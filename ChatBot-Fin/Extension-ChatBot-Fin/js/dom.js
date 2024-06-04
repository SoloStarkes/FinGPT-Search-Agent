function createElement(tag, styles = {}, textContent = '') {
    const element = document.createElement(tag);
    Object.assign(element.style, styles);
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

function appendElement(parent, tag, textContent = '') {
    const element = document.createElement(tag);
    element.innerText = textContent;
    parent.appendChild(element);
}

function createButton(text, styles, onClick) {
    const button = createElement('button', styles, text);
    button.addEventListener('click', onClick);
    return button;
}
