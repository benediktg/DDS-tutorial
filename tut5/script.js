$(document).ready(function main() {
    $("#add").click(function addRow() {
        if ($("#name").val() === "") {
            alert("Please enter a name.");
            return;
        }
        var name = $("<td></td>").text($("#name").val());
        var up = $("<button></button>").text("Move up").click(moveUp);
        var down = $("<button></button>").text("Move down").click(moveDown);
        var operations = $("<td></td>").append(up, down);
        var row = $("<tr></tr>").append(name, operations);
        $("#nameList").append(row);
        $("#name").val("");
    });

    $("#sort").click(function sortElements() {
        $("tr").slice(1).sort(function (a, b) {
            if (a.innerText === b.innerText) {
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
    var obj = $(this).parent().parent();
    if (obj.index() === 1) {
        return;
    }
    obj.insertBefore(obj.prev());
}

function moveDown() {
    var obj = $(this).parent().parent();
    obj.insertAfter(obj.next());
}
