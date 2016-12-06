var changeSpeed = null;

require(["dojo/dom", "dijit/form/HorizontalSlider", "dijit/form/HorizontalRuleLabels", "dojo/domReady!"],

    function (dom, HorizontalSlider, HorizontalRuleLabels) {
        var SPEED_FAC = 0.8;

        var speed = 3;

        changeSpeed = function (newspeed) {
            speed = newspeed * SPEED_FAC;
        }

        var slider = new HorizontalSlider({
            name: "slider",
            value: 3,
            minimum: -10,
            maximum: 10,
            discreteValues: 21,
            intermediateChanges: true,
            style: "width:300px;",
            onChange: changeSpeed
        }, "slider");

        var hLabels = new HorizontalRuleLabels({
            container: "bottomDecoration",
            style: "width:260px;margin-left:20px;height:2em;font-size:75%;color:gray;"
        }, "SliderLabels");
    }
);
