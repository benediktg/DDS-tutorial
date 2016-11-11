var table = document.getElementsByTagName("tbody")[0];
var height = 4;
var width = 4;
var cleanRow;
var cleanElem;

function getTableElement(row, col) {
    "use strict";
    var selectedRow = table.firstElementChild;
    while (row > 0) {
        selectedRow = selectedRow.nextElementSibling;
        row -= 1;
    }
    var elem = selectedRow.firstElementChild;
    while (col > 0) {
        elem = elem.nextElementSibling;
        col -= 1;
    }
    return elem;
}

function setClickHandler(row, col) {
    "use strict";
    var elem = getTableElement(row, col);
    elem.addEventListener("click", function () {
        elem.innerHTML = "";
        elem.style = "";
    });
}

function initClickHandlers() {
    "use strict";
    var i;
    var j;
    for (i = 0; i < height; i += 1) {
        for (j = 0; j < width; j += 1) {
            setClickHandler(i, j);
        }
    }
}


function handleMyButton() {
    "use strict";
    var col = parseInt(document.getElementById("field_x").value);
    var row = parseInt(document.getElementById("field_y").value);
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;
    var i;
    var j;
    var copiedElem;
    var copiedRow;
    if (col >= width) {
        for (i = 0; i < height; i += 1) {
            for (j = width - 1; j < col; j += 1) {
                copiedElem = cleanElem.cloneNode(true);
                table.children[i].appendChild(copiedElem);
                copiedElem = cleanElem.cloneNode(true);
                cleanRow.appendChild(copiedElem);
            }
        }
        width = col + 1;
    }
    if (row >= height) {
        for (i = height - 1; i < row; i += 1) {
            copiedRow = cleanRow.cloneNode(true);
            table.appendChild(copiedRow);
        }
        height = row + 1;
    }
    var elem = getTableElement(row, col);
    elem.innerHTML = text;
    elem.style = css;
}

function main() {
    "use strict";
    initClickHandlers();
    cleanRow = table.firstElementChild.cloneNode(true);
    cleanElem = cleanRow.firstElementChild.cloneNode(true);
    document.getElementById("mybutton").addEventListener("click", handleMyButton);
}

main();
