"use strict";

var list = document.getElementsByTagName("ul")[0];
var form = document.forms[0];
var url = "https://vsr.informatik.tu-chemnitz.de/edu/2015/evs/exercises/jsajax/guestbook.php";

function appendEntry(id, name, text) {
    var entry = document.createElement("li");
    entry.innerHTML = "<b>" + name + ":</b> " + text
        + " <a href=\"#\" alt=\"Delete entry\">(X)</a>";
    entry.setAttribute("entry-id", String(id));
    entry.lastElementChild.addEventListener("click", function () {
        removeEntry(this.parentElement);
    });
    list.appendChild(entry);
}

function removeEntry(elem) {
    var params = "?id=" + elem.getAttribute("entry-id");
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url + params, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadList();
        }
    };
    xhr.send();
}

function postEntry() {
    var xhr = new XMLHttpRequest();
    var name = encodeURIComponent(form["name"].value.trim());
    var text = encodeURIComponent(form["text"].value.trim());
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
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadList();
        }
    };
    xhr.send(params);
    form["name"].value = "";
    form["text"].value = "";
}

function loadList() {
    for (var i = list.children.length; i > 0; --i) {
        list.removeChild(list.firstElementChild);
    }
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var array = JSON.parse(this.responseText);
            for (var i = 0; i < array.length; ++i) {
                appendEntry(array[i].id, array[i].name, array[i].text);
            }
        }
    };
    xhr.send();
}

function main() {
    form.getElementsByTagName("button")[0].addEventListener("click",
        function (event) {
            event.preventDefault();
            postEntry();
        });
    loadList();
}

main();
