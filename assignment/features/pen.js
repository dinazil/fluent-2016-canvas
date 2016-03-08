function PenFeature(context) {
        
        var onmousedown = function (event) {
            console.log("Mouse down in Pen");
        };

        var onmousemove = function (event) {
            console.log("Mouse moving in Pen");
        };

        var onmouseup = function (event) {
            console.log("Mouse up in Pen");
        };

        return {
            name: "Pen",
            onmousedown: onmousedown,
            onmousemove: onmousemove,
            onmouseup: onmouseup
        };
    }