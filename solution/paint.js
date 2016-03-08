var canvas;
var context;
var undoFeature;

function newCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function setStrokeColor(newValue) {
    context.strokeStyle = newValue;
}

function setFillColor(newValue) {
    context.fillStyle = newValue;
}

function setStrokeWidth(newValue) {
    context.lineWidth = newValue;
}

$(document).ready(function () {

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    var features = [PenFeature(context),
        CircleFeature(context, canvas),
        RectangleFeature(context, canvas),
        PolygonFeature(context, canvas)];
    var featuresDictionary = {};
    for (var f in features) {
        var feature = features[f];
        featuresDictionary[feature.name] = feature;
    }

    var featuresSelection = document.getElementById("features");
    for (var f in features) {
        var feature = features[f];
        var selector = document.createElement("input");
        selector.type = "radio";
        selector.name = "features";
        selector.value = feature.name;
        selector.onchange = function () {
            setMode(featuresDictionary[this.value]);
        }
        featuresSelection.appendChild(selector);
        var label = document.createElement("label");
        label.innerText = feature.name;
        featuresSelection.appendChild(label);
    }

    var currentFeature;

    function removeFeature(feature) {
        canvas.removeEventListener("mousedown", feature.onmousedown);
        canvas.removeEventListener("mousemove", feature.onmousemove);
        canvas.removeEventListener("mouseup", feature.onmouseup);
    }

    function addFeature(feature) {
        canvas.addEventListener("mousedown", feature.onmousedown);
        canvas.addEventListener("mousemove", feature.onmousemove);
        canvas.addEventListener("mouseup", feature.onmouseup);
    }

    function setMode(mode) {
        if (currentFeature) {
            removeFeature(currentFeature);
        }

        currentFeature = mode;
        addFeature(currentFeature);
    }
});