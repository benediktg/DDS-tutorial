var list = document.getElementsByTagName("ul")[0];
var form = document.forms[0];
var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";
var localEntries = {};


function showAllEntries(array) {
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
        entry.setAttribute("entry-id", String(array[i].id));
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
    var params = "id=" + id
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + "?" + params, true);
    xhr.send();
    list.removeChild(localEntries[id]);
    delete localEntries[id];
    return;
}

function loadList() {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            showAllEntries(JSON.parse(this.responseText));
        }
    };
    xhr.send();
    return;
}

function postEntry() {
    "use strict";
    var xhr = new XMLHttpRequest();
    var name = encodeURIComponent(form["name"].value);
    var text = encodeURIComponent(form["text"].value);
    var params = "name=" + name + "&text=" + text;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        var r;
        if (this.readyState == 4 && this.status == 200) {
            r = JSON.parse(this.responseText);
            loadList();
        }
    };
    xhr.send(params);
    form["name"].value = "";
    form["text"].value = "";
    return;
}

function main() {
    "use strict";
    list.removeChild(list.firstElementChild);
    list.removeChild(list.firstElementChild);
    form.getElementsByTagName("button")[0].addEventListener("click",
        function (event) {
            event.preventDefault();
            postEntry();
        });
    loadList();
    return;
}

main();
