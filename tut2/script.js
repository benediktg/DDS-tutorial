var lastField = null;
var currentFillColor = '';   // ???
var changeCounter = 0;       // ???

function setField(element) {
    // element contains the current html element
    if (element.style.backgroundColor !== currentFillColor) {
        element.style.backgroundColor = currentFillColor;
    } else {
        element.style.backgroundColor = '#eee';
    }
    if (++changeCounter === 10) {
        alert('You have clicked 10 times on the field!');
        // Should the counter be reset after the alert?
        // changeCounter = 0;
    }
}

function setFillColor(color) {
    // color should be a string
    var logEntry = document.createElement('p');
    logEntry.appendChild(document.createTextNode('Color changed'));
    logEntry.style.color = currentFillColor = color;
    document.getElementById('Log').appendChild(logEntry);
}
