var canvas;
var mainContext;
var offscreenCanvas;

$(document).ready(function () {
    console.log("Starting clock...");

    canvas = document.getElementById("canvas");  
    mainContext = canvas.getContext("2d");
    
    var center = {};
    center.x = canvas.width / 2;
    center.y = canvas.height / 2;
    
    // so that we can use a centered coordinate system
    mainContext.translate(center.x, center.y);

    initializeStaticParts(center);  

    animate();
});

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
    drawClock(mainContext);
}

function initializeStaticParts(center) {
    offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    var offscreenContext = offscreenCanvas.getContext("2d");
    offscreenContext.translate(center.x, center.y);
    drawStaticParts(offscreenContext);
}

function drawStaticParts(context) {
    drawOuterFrame(context);
    drawInnerFrame(context);
    drawNumbersRotated(context);
    drawCenter(context);
}

function drawClock(context) {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var milliseconds = now.getMilliseconds();
    console.log("Drawing clock. Time is " + hours + ":" + minutes + ":" + seconds + "." + milliseconds);

    context.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    drawOffscreenCanvas(context);
    drawSeconds(context, hours, minutes, seconds, milliseconds);
    drawMinutes(context, hours, minutes, seconds);
    drawHours(context, hours, minutes, seconds);
}

function drawOffscreenCanvas(context) {
    context.drawImage(offscreenCanvas, -canvas.width/2, -canvas.height/2);
}

function drawOuterFrame(context) {
    var size = 0.9 * Math.min(canvas.width, canvas.height);
    
    context.strokeStyle = "brown";
    context.lineWidth = 10;
    context.strokeRect(-size/2, -size/2, size, size);
}

function drawInnerFrame(context) {
    var radius = 0.7 * Math.min(canvas.width, canvas.height) / 2;
    
    context.fillStyle = "yellow";
    context.strokeStyle = "orange";
    context.lineWidth = 20;
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
    context.stroke();
}

function drawNumbersRotated(context) {
    var radius = 0.7 * Math.min(canvas.width, canvas.height) / 2;
    
    context.font = "16px consolas";
    context.fillStyle = "brown";
    context.textBaseline = "middle";
    
    context.save();
    
    for (var i = 1; i <= 12; ++i) {
        var location = {};
        location.x = 0;
        location.y = -radius;
        
        context.rotate(Math.PI / 6);
        context.fillText(i, location.x, location.y);
    }
    
    context.restore();
}

function drawCenter(context) {
    context.fillStyle = "black";
    
    context.beginPath();
    context.arc(0, 0, 5, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

function drawSeconds(context, hours, minutes, seconds, milliseconds) {
    var radius = 0.6 * Math.min(canvas.width, canvas.height) / 2;
    
    context.strokeStyle = "black";
    context.lineWidth = 1;
    
    context.beginPath();
    context.moveTo(0, 0);
    var end = {};
    end.x = radius * Math.cos(2 * Math.PI * (seconds / 60 + milliseconds / 60000) - Math.PI / 2);
    end.y = radius * Math.sin(2 * Math.PI * (seconds / 60 + milliseconds / 60000) - Math.PI / 2);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function drawMinutes(context, hours, minutes, seconds) {
    var radius = 0.5 * Math.min(canvas.width, canvas.height) / 2;
    
    context.strokeStyle = "black";
    context.lineWidth = 3;
    
    context.beginPath();
    context.moveTo(0, 0);
    var end = {};
    end.x = radius * Math.cos(2 * Math.PI * (minutes / 60 + seconds / 60 / 60)  - Math.PI / 2);
    end.y = radius * Math.sin(2 * Math.PI * (minutes / 60 + seconds / 60 / 60) - Math.PI / 2);
    context.lineTo(end.x, end.y);
    context.stroke();
}

function drawHours(context, hours, minutes, seconds) {
    var radius = 0.4 * Math.min(canvas.width, canvas.height) / 2;
    
    context.strokeStyle = "black";
    context.lineWidth = 5;
    
    context.beginPath();
    context.moveTo(0, 0);
    var end = {};
    end.x = radius * Math.cos(2 * Math.PI * (hours / 12 + minutes / 60 / 12) - Math.PI / 2);
    end.y = radius * Math.sin(2 * Math.PI * (hours / 12 + minutes / 60 / 12) - Math.PI / 2);
    context.lineTo(end.x, end.y);
    context.stroke();
}