$(document).ready(function main() {
    $("#add").click(function addRow() {
        var name = $("<td></td>").text($("#name").val());
        var up = $("<button></button>").text("Move up").click(moveUp);
        var down = $("<button></button>").text("Move down").click(moveDown);
        var operations = $("<td></td>").append(up, down);
        var row = $("<tr></tr>").append(name, operations);
        $("#nameList").append(row);
        $("#name").val("");
    })

})

function moveUp() {

}

function moveDown() {

}
