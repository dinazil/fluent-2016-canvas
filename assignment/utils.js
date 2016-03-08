function getPixelFromEvent(event) {
    if (event.offsetX) {
        return { x: event.offsetX, y: event.offsetY };
    } else if (event.layerX) {
        return { x: event.layerX, y: event.layerY };
    }
    return { x: 0, y: 0 };
}