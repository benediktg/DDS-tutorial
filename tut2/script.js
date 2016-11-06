var lastField = null;
var currentFillColor = '';   // ???
var changeCounter = 0;       // ???

function setField(element) {
    // element contains the current html element
    element.style.backgroundColor = currentFillColor;
}

function setFillColor(color) {
    // color should be a string
    currentFillColor = color;
}
