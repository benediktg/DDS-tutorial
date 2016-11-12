var table = document.getElementsByTagName("tbody")[0];

function addRow() {
    "use strict";
    var width = table.rows[0].cells.length;
    var newRow = table.insertRow();
    var newCell;
    while (width > 0) {
        width -= 1;
        newCell = newRow.insertCell();
        newCell.addEventListener("click", function () {
            newCell.innerHTML = "";
            newCell.style = "";
        });
    }
}

function addCol() {
    "use strict";
    var height = table.rows.length;
    var newCell;
    while (height > 0) {
        height -= 1;
        newCell = table.rows[height].insertCell();
        newCell.addEventListener("click", function () {
            newCell.innerHTML = "";
            newCell.style = "";
        });
    }
}

function ensureTableSize(minHeight, minWidth) {
    "use strict";
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

function setClickHandler(row, col) {
    "use strict";
    var selectedRow = table.rows[row];
    var elem = selectedRow.cells[col];
    elem.addEventListener("click", function () {
        elem.innerHTML = "";
        elem.style = "";
    });
}

function handleMyButton() {
    "use strict";
    var col = parseInt(document.getElementById("field_x").value);
    var row = parseInt(document.getElementById("field_y").value);
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;

    ensureTableSize(row, col);
    var selectedRow = table.rows[row];
    var elem = selectedRow.cells[col];
    elem.innerHTML = text;
    elem.style = css;
}

function main() {
    "use strict";
    var height = table.rows.length;
    var width;
    while (height > 0) {
        height -= 1;
        width = table.rows[height].cells.length;
        while (width > 0) {
            width -= 1;
            setClickHandler(height, width);
        }
    }
    document.getElementById("mybutton").addEventListener("click", handleMyButton);
}

main();
