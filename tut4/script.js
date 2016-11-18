var list = document.getElementsByTagName("ul")[0];
var form = document.forms[0];
var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";
var localEntries = {};


function appendEntry(id, name, text) {
    "use strict";
    if (String(id) in localEntries) {
        return;
    }
    var entry = document.createElement("li");
    entry.innerHTML = "<b>" + name + ":</b> " + text
        + " <a href=\"#\" alt=\"Delete entry\">(X)</a>";
    entry.setAttribute("entry-id", String(id));
    entry.lastElementChild.addEventListener("click", function () {
        removeEntry(this.parentElement.getAttribute("entry-id"));
    });
    list.appendChild(entry);
    localEntries[String(id)] = entry;
    return;
}

function removeEntry(id) {
    "use strict";
    var params = "id=" + id
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + "?" + params, true);
    xhr.send();
    list.removeChild(localEntries[id]);
    delete localEntries[id];
    return;
}

function postEntry() {
    "use strict";
    var xhr = new XMLHttpRequest();
    var name = encodeURIComponent(form["name"].value);
    var text = encodeURIComponent(form["text"].value);
    if (name === "") {
        alert("Please provide a name.");
        return;
    }
    if (text === "") {
        alert("Please provide some text.");
        return;
    }
    var params = "name=" + name + "&text=" + text;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        var r;
        if (this.readyState == 4 && this.status == 200) {
            r = JSON.parse(this.responseText);
            appendEntry(r.entry.id, r.entry.name, r.entry.text);
        }
    };
    xhr.send(params);
    form["name"].value = "";
    form["text"].value = "";
    return;
}

function loadList() {
    "use strict";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var array = JSON.parse(this.responseText)
            var entryCount = array.length;
            var i;
            for (i = 0; i < entryCount; ++i) {
                appendEntry(array[i].id, array[i].name, array[i].text);
            }
        }
    };
    xhr.send();
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
