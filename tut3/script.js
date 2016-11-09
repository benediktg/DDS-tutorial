var text = "";
var fieldX = "";
var fieldY = "";
var css = "";
var table = document.getElementsByTagName("tbody")[0];

function setTableElement(i, j, text, css) {
    table.children[i].children[j].innerHTML = text;
    table.children[i].children[j].style = css;
}

function getTableElement(i, j) {
    return table.children[i].children[j];
}

function handleTextInput() {
    text = document.getElementById("text").value;
}

function handleFieldXInput() {
    fieldX = document.getElementById("field_x").value;
}

function handleFieldYInput() {
    fieldY = document.getElementById("field_y").value;
}

function handleCssInput() {
    css = document.getElementById("css").value;
}

function handleMyButton() {

}

document.getElementById("text").addEventListener("change", handleTextInput);
document.getElementById("field_x").addEventListener("change", handleFieldXInput);
document.getElementById("field_y").addEventListener("change", handleFieldYInput);
document.getElementById("css").addEventListener("change", handleCssInput);
document.getElementById("mybutton").addEventListener("click", handleMyButton);
