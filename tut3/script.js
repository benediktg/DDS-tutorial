var table = document.getElementsByTagName("tbody")[0];

function setTableElement(col, row, text, css) {
    table.children[row].children[col].innerHTML = text;
    table.children[row].children[col].style = css;
}

function initClickHandlers() {
    var height = table.children.length;
    var width = table.children[0].children.length;
    var i;
    var j;
    var row;
    var elem;
    for (i = 0; i < height; ++i) {
        row = table.children[i];
        for (j = 0; j < width; ++j) {
            elem = row.children[j];
            if (!elem.hasAttribute("hasEventHandler")) {
                elem.addEventListener("click", function() {
                    this.innerHTML = "";
                    this.style = "";
                });
                elem.setAttribute("hasEventHandler", "true");
            }
        }
    }
}

function handleMyButton() {
    var col = document.getElementById("field_x").value;
    var row = document.getElementById("field_y").value;
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;
    var height = table.children.length;
    var width = table.children[0].children.length;
    if (row < height && col < width) {
        setTableElement(col, row, text, css);
    } else {
        if (row >= height) {
            // add rows
        }
        if (col >= width) {
            // add columns
        }
        initClickHandlers();
    }
}

function main() {
    initClickHandlers();
    document.getElementById("mybutton").addEventListener("click", handleMyButton);
}

main();
