function PolygonFeature(context, canvas) {
    
    var onmousedown = function (event) {
        console.log("Mouse down in Polygon");
    }
    
    var onmousemove = function (event) {
        console.log("Mouse moving in Polygon");   
    }

    var onmouseup = function (event) {
        console.log("Mouse up in Polygon");
    };
    
    return {
        name: "Polygon",
        onmousedown: onmousedown,
        onmousemove: onmousemove,
        onmouseup: onmouseup
    }
}