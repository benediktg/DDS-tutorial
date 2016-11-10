var rowCount = 4;
var colCount = 4;
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
            elem.addEventListener("click", function() {
                this.innerHTML = "";
                this.style = "";
            });
        }
    }
}

function handleMyButton() {
    var col = document.getElementById("field_x").value;
    var row = document.getElementById("field_y").value;
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;
    setTableElement(col, row, text, css);
}

function main() {
    initClickHandlers();
    document.getElementById("mybutton").addEventListener("click", handleMyButton);

}

main();
