
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
    
    for (var i = 0; i < numberOfShapes; ++i) {
        var top = canvas.height * Math.random();
        var left = canvas.width * Math.random();
        var width = 10 * Math.random();
        var height = 10 * Math.random();
        var angle = 2 * Math.PI * Math.random();
        
        fillRotatedRect2(context, left, top, width, height, angle);
    }
}

function fillRotatedRect2(context, left, top, width, height, angle) {
    var cx = left + width / 2;
    var cy = top + height / 2;
    context.beginPath();
    var c1 = rotateCorner(left, top, angle, cx, cy);
    context.moveTo(c1.x, c1.y);
    var c2 = rotateCorner(left + width, top, angle, cx, cy);
    context.lineTo(c2.x, c2.y);
    var c3 = rotateCorner(left + width, top - height, angle, cx, cy);
    context.lineTo(c3.x, c3.y);
    var c4 = rotateCorner(left, top - height, angle, cx, cy);
    context.lineTo(c4.x, c4.y);
    
    context.closePath();
    context.fill();

}

function rotateCorner(x, y, angle, cx, cy) {
    // center around center
    var tempX = x - cx;
    var tempY = y - cy;

    // now apply rotation
    var s = Math.sin(angle);
    var c = Math.cos(angle);
    var rotatedX = tempX * c - tempY * s;
    var rotatedY = tempX * s + tempY * c;

    // translate back
    var rx = rotatedX + cx;
    var ry = rotatedY + cy;
    
    return {x: rx, y: ry};   
}