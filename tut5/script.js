$(document).ready(function main() {
    $("#add").click(function addRow() {
        var name = $("<td></td>").text($("#name").val());
        var up = $("<button></button>").text("Move up").click(moveUp);
        var down = $("<button></button>").text("Move down").click(moveDown);
        var operations = $("<td></td>").append(up, down);
        var row = $("<tr></tr>").append(name, operations);
        $("#nameList").append(row);
        $("#name").val("");
    });

    $("#sort").click(function sortElements() {
        $("tr").sort(function (a, b) {
            var pattern = /Name\s*Operations/;
            if (pattern.test(a.innerText) || pattern.test(b.innerText)) {
                return 0;
            } else if (a.innerText > b.innerText) {
                return 1;
            } else {
                return -1;
            }
        }).appendTo("#nameList");
    });
});

function moveUp() {

}

function moveDown() {

}
