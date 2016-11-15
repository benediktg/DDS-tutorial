var list = document.getElementsByTagName("ul")[0];
var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";
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
        entry.setAttribute("entry-id", array[i].id);
        entry.lastElementChild.addEventListener("click", function () {
            removeEntry(this);
        });
        list.appendChild(entry);
    }
}

function removeEntry(aTag) {
    "use strict";
    var id = aTag.parentElement.getAttribute("entry-id");
}
