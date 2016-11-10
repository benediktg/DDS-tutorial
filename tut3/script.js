var rowCount = 4;
var colCount = 4;
var table = document.getElementsByTagName("tbody")[0];

function setTableElement(col, row, text, css) {
    table.children[row].children[col].innerHTML = text;
    table.children[row].children[col].style = css;
}

function getTableElement(col, row) {
    return table.children[row].children[col];
}

function handleMyButton() {
    var col = document.getElementById("field_x").value;
    var row = document.getElementById("field_y").value;
    var text = document.getElementById("text").value;
    var css = document.getElementById("css").value;
    setTableElement(col, row, text, css);
}


function main() {
    document.getElementById("mybutton").addEventListener("click", handleMyButton);

}

main();
