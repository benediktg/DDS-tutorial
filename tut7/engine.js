var bewege = null;
var erzeugeElemente = null;
var SPEED_FAC = 0.8;
var speed = 3;

try {
    var ws = new WebSocket("ws://localhost:9000/");

    ws.onopen = function (event) {
        console.log("Websocket opened.");
    };
    ws.onclose = function (event) {
        console.log("Socket closed.");
    };
    ws.onmessage = function (event) {
        console.log("Socket message:", event.data);
        newSpeed = parseInt(event.data);
        if (newSpeed <= 10 && newSpeed >= -10) {
            speed = newSpeed * SPEED_FAC;
        }
    };
    ws.onerror = function (event) {
        console.log("Socket error:", event);
    };
} catch (exc) {
    console.log("Socket exception:", ex);
}

require(["dojo/dom", "dojox/gfx", "dojo/domReady!"],

    function (dom, gfx) {
        var surface = gfx.createSurface("zeichenflaeche", 300, 500);
        var surface_size = {width: 500, height: 300};

        var SCHEIBE_RAD = 60;
        var SCHEIBE_MITTX = 150;
        var SCHEIBE_MITTY = 320;
        var SCHEIBE_OFFENW = 150;
        var PLEUEL_BREITE = 15;
        var PLEUEL_LANG_KURZ = 0.8 * SCHEIBE_RAD;
        var PLEUEL_LANG_LANG = 1.5 * SCHEIBE_RAD;
        var PLEUEL_NETTO = 0.9 * PLEUEL_LANG_LANG;
        var SPLINT_RAD = 4;
        var STANGE_BREIT = 15;
        var STANGE_LANG = 160.0;
        var STANGE_OVER = 0.06 * STANGE_LANG;
        var KOLBEN_WIDTH = 20;
        var KOLBEN_HEIGHT = 70;
        var KOLBEN_DIST = 0.9 * KOLBEN_HEIGHT;
        var KOLBEN_WIDTH2 = 30;
        var KOLBEN_WIDTH1 = 20;
        var KOLBEN_HOCH = 70;
        var KOLBEN_OVER = 7;
        var K_RING_DIST = 5;

        var winkel = 0.0;
        var trans1;

        var kolben;
        var scheibe;
        var stange;

        var scheibe_basis;
        var pleuel;
        var stange;
        var stange_base;
        var splint1;
        var splint2;
        var trans1;

        bewege = function() {
            winkel += speed;
            var mr = dojox.gfx.matrix.rotateg(winkel);
            var alpha = -Math.asin(PLEUEL_NETTO / STANGE_LANG * Math.sin(Math.PI * winkel / 180.0));
            var l = PLEUEL_NETTO * Math.cos(Math.PI * winkel / 180.0) + STANGE_LANG * Math.cos(alpha);
            var mt = dojox.gfx.matrix.translate(SCHEIBE_MITTX, SCHEIBE_MITTY - l);
            var mr2 = dojox.gfx.matrix.rotate(alpha);
            scheibe.setTransform([trans1, mr]);
            stange.setTransform([mt, mr2]);
            kolben.setTransform(mt);
            setTimeout("bewege();", 40);
        }

        erzeugeElemente = function() {
            kolben = surface.createPath().setFill("#886622").setStroke({color: "#aa0000", width: 2});

            kolben.moveTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 2 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 2 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 3 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 3 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 4 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 4 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 5 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 5 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 6 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 6 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 7 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 7 * K_RING_DIST);
            kolben.lineTo(KOLBEN_WIDTH2 / 2.0, KOLBEN_OVER);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, KOLBEN_OVER);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 7 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 7 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 6 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 6 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 5 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 5 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 4 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 4 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 3 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 3 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH1 / 2.0, -KOLBEN_HOCH + 2 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH + 2 * K_RING_DIST);
            kolben.lineTo(-KOLBEN_WIDTH2 / 2.0, -KOLBEN_HOCH);
            kolben.closePath();

            scheibe = surface.createGroup();
            scheibe_basis = scheibe.createPath()
                .setFill("#ffff55")
                .setStroke({color: "#000044", width: 2});
            scheibe_basis.moveTo(0, 0);
            scheibe_basis.lineTo(-SCHEIBE_RAD * Math.cos(Math.PI * SCHEIBE_OFFENW / 180.0),
                                 -SCHEIBE_RAD * Math.sin(Math.PI * SCHEIBE_OFFENW / 180.0));
            scheibe_basis.arcTo(SCHEIBE_RAD, SCHEIBE_RAD, 0, true, true,
                                SCHEIBE_RAD * Math.cos(Math.PI * SCHEIBE_OFFENW / 180.0),
                                -SCHEIBE_RAD * Math.sin(Math.PI * SCHEIBE_OFFENW / 180.0));
            scheibe_basis.lineTo(0, 0);
            scheibe_basis.closePath();

            pleuel = scheibe.createPath()
                .setFill("#0000ff")
                .setStroke({color: "#222222", width: 2});

            pleuel.moveTo(-PLEUEL_BREITE / 2.0, PLEUEL_LANG_KURZ);
            pleuel.lineTo(-PLEUEL_BREITE / 2.0, -PLEUEL_LANG_LANG);
            pleuel.arcTo(PLEUEL_BREITE / 2.0, PLEUEL_BREITE / 2.0 / 2.0, 0,
                         true, true,
                         PLEUEL_BREITE / 2.0, -PLEUEL_LANG_LANG);
            pleuel.lineTo( PLEUEL_BREITE / 2.0, PLEUEL_LANG_KURZ);
            pleuel.arcTo(PLEUEL_BREITE / 2.0, PLEUEL_BREITE / 2.0 / 2.0, 0,
                         true, true,
                         -PLEUEL_BREITE / 2.0, PLEUEL_LANG_KURZ);
            pleuel.closePath();

            stange = surface.createGroup();
            stange_base = stange.createPath()
                .setFill("#00ff00")
                .setStroke({color: "#222222", width: 2});

            stange_base.moveTo(-STANGE_BREIT / 2.0, -STANGE_OVER);
            stange_base.lineTo(-STANGE_BREIT / 2.0, STANGE_LANG + STANGE_OVER);
            stange_base.arcTo(STANGE_BREIT / 2.0, STANGE_BREIT / 2.0 / 2.0, 0,
                              true, false,
                              STANGE_BREIT / 2.0, STANGE_LANG + STANGE_OVER);
            stange_base.lineTo( STANGE_BREIT / 2.0, -STANGE_OVER);
            stange_base.arcTo(STANGE_BREIT / 2.0, STANGE_BREIT / 2.0 / 2.0, 0,
                              true, false,
                              -STANGE_BREIT / 2.0, -STANGE_OVER);
            stange_base.closePath();

            splint1 = stange.createCircle({cx: 0, cy: STANGE_LANG, r:SPLINT_RAD})
                .setFill("red")
                .setStroke({color: "blue", width: 1});
            splint2 = stange.createCircle({cx: 0, cy: 0, r:SPLINT_RAD})
                .setFill("red")
                .setStroke({color: "blue", width: 1});

            trans1 = dojox.gfx.matrix.translate(SCHEIBE_MITTX, SCHEIBE_MITTY);
            setTimeout("bewege();", 100);
        }

        erzeugeElemente();
    }
);
