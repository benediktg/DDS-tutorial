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
}

function setFillColor(color) {
    // color should be a string
    currentFillColor = color;
}
