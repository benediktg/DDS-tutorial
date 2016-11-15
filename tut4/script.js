var list = document.getElementsByTagName("ul")[0];
var form = document.forms[0];
var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";
var localEntries = {};
list.removeChild(list.firstElementChild);
list.removeChild(list.firstElementChild);
form.getElementsByTagName("button")[0].addEventListener("click", postEntry)
loadList();

function loadList() {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            getEntries(JSON.parse(this.responseText));
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
    return;
}

function getEntries(array) {
    "use strict";
    var entryCount = array.length;
    var i;
    var entry;
    for (i = 0; i < entryCount; ++i) {
        if (String(array[i].id) in localEntries) {
            continue;
        }
        entry = document.createElement("li");
        entry.innerHTML = "<b>" + array[i].name + ":</b> " + array[i].text
            + " <a href=\"#\" alt=\"Delete entry\">(X)</a>";
        entry.setAttribute("entry-id", array[i].id);
        entry.lastElementChild.addEventListener("click", function () {
            removeEntry(this);
        });
        list.appendChild(entry);
        localEntries[String(array[i].id)] = entry;
    }
    return;
}

function removeEntry(aTag) {
    "use strict";
    var id = aTag.parentElement.getAttribute("entry-id");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + "?id=" + id, true);
    xhr.send();
    list.removeChild(localEntries[id]);
    delete localEntries[id];
    return;
}

function postEntry() {
    "use strict";
    var xhr = new XMLHttpRequest();
    var name = form["name"];
    var text = form["text"];
    var response;
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            response = JSON.parse(this.responseText);
            getSingleEntry(response.entry);
        }
    };
    xhr.open("POST", url, true);
    xhr.send("name=" + name + "&text=" + text);
    return;
}

function getSingleEntry(object) {
    if (String(object.id) in localEntries) {
        return;
    }
    entry = document.createElement("li");
    entry.innerHTML = "<b>" + object.name + ":</b> " + object.text
        + " <a href=\"#\" alt=\"Delete entry\">(X)</a>";
    entry.setAttribute("entry-id", object.id);
    entry.lastElementChild.addEventListener("click", function () {
        removeEntry(this);
    });
    list.appendChild(entry);
    localEntries[String(object.id)] = entry;
    return;
}
