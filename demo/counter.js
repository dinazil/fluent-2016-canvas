function measureTime() {
    var numberOfRepetitionsInput = document.getElementById("numberOfRepetitions");
    var timeTorender = document.getElementById("timeToRender");

    var numberOfRepetitions = parseInt(numberOfRepetitionsInput.value, 10);

    var start = new Date().getTime();
    for (var i = 0; i < numberOfRepetitions; ++i) {
        render();
    }
    var end = new Date().getTime();
    var time = end - start;
    
    timeTorender.innerHTML = "Time to render: " + time/numberOfRepetitions + " ms";    
}
