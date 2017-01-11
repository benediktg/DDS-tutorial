var inputBox = document.getElementById("message");
var output = document.getElementById("output");
var form = document.getElementById("form");

try {
    var host = "ws://localhost:9000/";
    console.log("Host:", host);

    var s = new WebSocket(host);

    s.onopen = function (e) {
        console.log("Socket opened.");
    };

    s.onclose = function (e) {
        console.log("Socket closed.");
    };
    
    s.onmessage = function (e) {
        console.log("Socket message:", e.data);
        var p = document.createElement("p");
        p.innerHTML = e.data;
        output.appendChild(p);
    };
    
    s.onerror = function (e) {
        console.log("Socket error:", e);
    };
    
} catch (ex) {
    console.log("Socket exception:", ex);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    s.send(inputBox.value);
    inputBox.value = "";
}, false);

