"use strict";

var table = document.getElementsByTagName("tbody")[0];

function addRow() {
    var newRow = table.insertRow();
    for (var i = table.rows[0].cells.length; i > 0; --i) {
        newRow.insertCell();
    }
}

function addCol() {
    for (var i = table.rows.length - 1; i >= 0; --i) {
        table.rows[i].insertCell();
    }
}

function ensureTableSize(minHeight, minWidth) {
    var currentHeight = table.rows.length;
    var currentWidth = table.rows[0].cells.length;
    while (currentHeight <= minHeight) {
        addRow();
        currentHeight = table.rows.length;
    }
    while (currentWidth <= minWidth) {
        addCol();
        currentWidth = table.rows[0].cells.length;
    }
}

function handleMyButton() {
    var colText = document.getElementById("field_x").value.trim();
    var rowText = document.getElementById("field_y").value.trim();
    var isNumber = /^[1-9][0-9]*$/;
    if (!isNumber.test(colText)) {
        alert ("Please provide a valid x coordinate.")
        document.getElementById("field_x").value = "";
        return;
    }
    if (!isNumber.test(rowText)) {
        alert ("Please provide a valid y coordinate.")
        document.getElementById("field_y").value = "";
        return;
    }
    var col = parseInt(colText) - 1;
    var row = parseInt(rowText) - 1;
    var text = document.getElementById("text").value.trim();
    var css = document.getElementById("css").value;

    ensureTableSize(row, col);
    var cell = table.rows[row].cells[col];

    cell.innerHTML = text;
    cell.style = css;
    /* add eventlistener only once */
    if (cell.getAttribute("eventlistener") !== "available") {
        cell.addEventListener("click", function () {
            this.innerHTML = "";
            this.style = "";
        });
        cell.setAttribute("eventlistener", "available");
    }

    document.getElementById("field_x").value = "";
    document.getElementById("field_y").value = "";
    document.getElementById("text").value = "";
    document.getElementById("css").value = "";
}

function handleEnterKey(event) {
    if (event.which === 13) {
        handleMyButton();
    }
}

document.getElementById("mybutton").addEventListener("click", handleMyButton);
document.getElementById("field_x").addEventListener("keydown", handleEnterKey);
document.getElementById("field_y").addEventListener("keydown", handleEnterKey);
document.getElementById("text").addEventListener("keydown", handleEnterKey);
document.getElementById("css").addEventListener("keydown", handleEnterKey);
