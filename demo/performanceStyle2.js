
var canvas;
var start;

$(document).ready(function () {
    canvas = document.getElementById("canvas");  
    var context = canvas.getContext("2d");
    
    start = function() {
        var numberOfShapes = parseInt(document.getElementById("numberOfShapes").value);
        stop = false;
        animate(context, numberOfShapes);
    }
});

var stop = false;
function animate(context, numberOfShapes) {
    render(context, numberOfShapes);
    if (!stop) {
        requestAnimationFrame(()=> {
            animate(context, numberOfShapes);
        });
    }
}

function stopAnimation() {
    stop = true;
}

function render(context, numberOfShapes) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    var rects = generateRandomRectangles(numberOfShapes);
    drawRectsGrouped(rects, context);
}

function drawRectsGrouped(rects, context) {
    var groups = {};
    for (var i = 0; i < rects.length; ++i) {
        var rect = rects[i];
        
        if (groups[rect.c] == null) {
            groups[rect.c] = [];
        }
        groups[rect.c].push(rect);
    }
    
    for (var c in groups)
    {
        var cRects = groups[c];
        context.fillStyle = c;
        for (var i = 0; i < cRects.length; ++i) {
            var rect = cRects[i];
            context.fillRect(rect.x, rect.y, rect.w, rect.h);
        }
    }
}

var colors = ["red", "black", "orange", "magenta", "cyan",
              "yellow", "blue", "purple", "green", "pink"];

function generateRandomRectangles(numberOfShapes) {
    var result = [];
    for (var i = 0; i < numberOfShapes; ++i) {
        var top = canvas.height * Math.random();
        var left = canvas.width * Math.random();
        var width = 10 * Math.random();
        var height = 10 * Math.random();
        var color = colors[Math.floor(colors.length * Math.random())];
        
        result.push({x: left, y: top, w: width, h: height, c: color});
    }
    return result;
}
