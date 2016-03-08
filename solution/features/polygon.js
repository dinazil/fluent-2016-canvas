function PolygonFeature(context, canvas) {
    var startLocation;
    var lastLocation;
    var started = false;
    var imageBefore;
    var imageInBetween;
    var path;
    
    function distance(p1, p2) {
        return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y));
    }
    
    var onmousemove = function (event) {
        if (!started) { return; }
        var p = getPixelFromEvent(event);
        context.putImageData(imageInBetween, 0, 0);
        context.beginPath();
        context.moveTo(lastLocation.x, lastLocation.y);
        context.lineTo(p.x, p.y);
        context.stroke();
    }

    var onmouseup = function (event) {
        var p = getPixelFromEvent(event);
        lastLocation = p;
        imageInBetween = context.getImageData(0, 0, canvas.width, canvas.height);
        if (!started) {
            started = true;
            startLocation = p;
            imageBefore = context.getImageData(0, 0, canvas.width, canvas.height);
            context.beginPath();
            path = new Path2D();            
            path.moveTo(p.x, p.y);
            context.moveTo(p.x, p.y);
        }
        else {
            var width = context.lineWidth;
            
            if (distance(p, startLocation) < width) {
                path.closePath();
                context.putImageData(imageBefore, 0, 0);
                context.fill(path);
                context.stroke(path);
                started = false;
            } else {
                path.lineTo(p.x, p.y);
                imageInBetween = context.getImageData(0, 0, canvas.width, canvas.height);
            }         
        }
    };
    
    return {
        name: "Polygon",
        onmousedown: null,
        onmousemove: onmousemove,
        onmouseup: onmouseup
    }
}