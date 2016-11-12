var table = document.getElementsByTagName("tbody")[0];

function addRow() {
    "use strict";
    var width = table.rows[0].cells.length;
    var newRow = table.insertRow();
    while (width > 0) {
        width -= 1;
        newRow.insertCell();
    }
}

function addCol() {
    "use strict";
    var height = table.rows.length;
    while (height > 0) {
        height -= 1;
        table.rows[height].insertCell();
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

function getTableCell(row, col) {
    "use strict";
    ensureTableSize(row, col);
    var selectedRow = table.firstElementChild;
    while (row > 0) {
        selectedRow = selectedRow.nextElementSibling;
        row -= 1;
    }
    var cell = selectedRow.firstElementChild;
    while (col > 0) {
        cell = cell.nextElementSibling;
        col -= 1;
    }
    return cell;
}

function handleMyButton() {
    "use strict";
    var col = parseInt(document.getElementById("field_x").value);
    var row = parseInt(document.getElementById("field_y").value);
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;

    var cell = getTableCell(row, col);
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
}

document.getElementById("mybutton").addEventListener("click", handleMyButton);
