var list = document.getElementsByTagName("ul")[0];
list.removeChild(list.firstElementChild);
list.removeChild(list.firstElementChild);
loadList();

function loadList() {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            createEntries(JSON.parse(this.responseText));
        }
    };
    var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";
    xhr.open("GET", url, true);
    xhr.send();
}

function createEntries(array) {
    "use strict";
    var i;
    var entry;
    for (i = 0; i < array.length; ++i) {
        entry = document.createElement("li");
        entry.innerHTML = "<b>" + array[i].name + ":</b> " + array[i].text
            + " <a href=\"#\" alt=\"Delete entry\">(X)</a>";
        list.appendChild(entry);
    }
}
