function CircleFeature(context, canvas) {

    var onmousedown = function (event) {
        console.log("Mouse down in Circle");
    };

    var onmousemove = function (event) {
        console.log("Mouse moving in Circle");
    };

    var onmouseup = function (event) {
        console.log("Mouse up in Circle");
    };

    return {
        name: "Circle",
        onmousedown: onmousedown,
        onmousemove: onmousemove,
        onmouseup: onmouseup
    };
}
