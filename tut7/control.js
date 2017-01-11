try {
    var ws = new WebSocket("ws://localhost:9000/");

    ws.onopen = function (event) {
        console.log("Websocket opened.", event);
    };
    ws.onclose = function (event) {
        console.log("Socket closed.", event);
    };
    ws.onerror = function (event) {
        console.log("Socket error:", event);
    };
} catch (exc) {
    console.log("Socket exception:", exc);
}

require(["dojo/dom", "dijit/form/HorizontalSlider",
        "dijit/form/HorizontalRuleLabels", "dojo/domReady!"],

    function (dom, HorizontalSlider, HorizontalRuleLabels) {
        var slider = new HorizontalSlider({
            name: "slider",
            value: 3,
            minimum: -10,
            maximum: 10,
            discreteValues: 21,
            intermediateChanges: true,
            style: "width:300px;",
            onChange: function (newSpeed) {
                if (ws.readyState !== WebSocket.OPEN) {
                    return;
                }
                ws.send(newSpeed.toString());
            }
        }, "slider");

        var hLabels = new HorizontalRuleLabels({
            container: "bottomDecoration",
            style: "width:260px;margin-left:20px;height:2em;font-size:75%;color:gray;"
        }, "SliderLabels");
    }
);
