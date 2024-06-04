function addDragFunctionality(element) {
    let isDragging = false;
    let offsetX, offsetY;

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const newX = event.clientX - offsetX;
            const newY = event.clientY - offsetY;

            element.style.left = `${newX}px`;
            element.style.top = `${newY}px`;

            const sourcesWindow = document.querySelector('.sources-window');
            sourcesWindow.style.left = `${newX + parseInt(element.style.width) + 10}px`;
            sourcesWindow.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}
