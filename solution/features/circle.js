function CircleFeature(context, canvas) {

    var isMouseDown = false;
    var startLocation;
    var imageBefore;

    var onmousedown = function (event) {
        isMouseDown = true;
        imageBefore = context.getImageData(0, 0, canvas.width, canvas.height);

        var p = getPixelFromEvent(event);
        startLocation = p;
        context.beginPath();
    };

    var onmousemove = function (event) {
        if (!isMouseDown) { return; }
        var p = getPixelFromEvent(event);
        context.putImageData(imageBefore, 0, 0);
        context.beginPath();
        var radius = Math.sqrt((startLocation.x - p.x) * (startLocation.x - p.x) + (startLocation.y - p.y) * (startLocation.y - p.y));
        context.arc(startLocation.x, startLocation.y, radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
    };

    var onmouseup = function (event) {
        isMouseDown = false;
    };

    return {
        name: "Circle",
        onmousedown: onmousedown,
        onmousemove: onmousemove,
        onmouseup: onmouseup
    };
}
