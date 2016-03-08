function RectangleFeature(context, canvas) {

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
        context.rect(startLocation.x, startLocation.y, p.x - startLocation.x, p.y - startLocation.y);
        context.closePath();
        context.fill();
        context.stroke();
    };

    var onmouseup = function (event) {
        isMouseDown = false;
    };

    return {
        name: "Rectangle",
        onmousedown: onmousedown,
        onmousemove: onmousemove,
        onmouseup: onmouseup
    };
}