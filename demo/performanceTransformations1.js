
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
        
        fillRotatedRect1(context, left, top, width, height, angle);
    }
}

function fillRotatedRect1(context, left, top, width, height, angle) {
    context.save();
    context.translate(left + width / 2, top + height / 2);
    context.rotate(angle);
    context.translate(-left - width / 2, -top - height / 2);
    context.fillRect(left, top, width, height);
    context.restore();
}
