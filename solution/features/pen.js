function PenFeature(context) {
        
        var isMouseDown = false;

        var onmousedown = function (event) {
            isMouseDown = true;
            var p = getPixelFromEvent(event);
            context.strokeRect(p.x, p.y, 1, 1);
            context.moveTo(p.x, p.y);
            context.beginPath();
        };

        var onmousemove = function (event) {
            if (!isMouseDown) { return; }
            var p = getPixelFromEvent(event);
            context.lineTo(p.x, p.y);
            context.stroke();
        };

        var onmouseup = function (event) {
            isMouseDown = false;
            context.closePath();
        };

        return {
            name: "Pen",
            onmousedown: onmousedown,
            onmousemove: onmousemove,
            onmouseup: onmouseup
        };
    }