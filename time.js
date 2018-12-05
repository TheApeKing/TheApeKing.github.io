function updateTimer(deadline) {
    var time = deadline - new Date().getTime();

    return {
    "days": Math.floor( time / (1000 * 60 * 60 * 24) ),
    "hours": Math.floor( (time / (1000 * 60 * 60)) % 24 ),
    "minutes": Math.floor( (time / 1000 / 60) % 60 ),
    "seconds": Math.floor( (time / 1000) % 60 ),
    "total": time
    }
}

function animateClock(span) {
    span.className = "turn";
    setTimeout(() => {
        span.className = "";
    }, 700);
}

function startTimer(id, deadline) {
    var timerInterval = setInterval(() => {
        var timer = updateTimer(deadline);
        var clock = document.querySelector(id);

        clock.innerHTML = `<span>${timer.days}</span>
        <span>${timer.hours}</span>
        <span>${timer.minutes}</span>
        <span>${timer.seconds}</span>`;

        var spans = clock.getElementsByTagName("span");
        animateClock(spans[3]);
        if(timer.seconds == 59) animateClock(spans[2]);
        if(timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
        if(timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0])

        if (timer.total < 1) {
        clearInterval(timerInterval);
        var lia = document.createElement("p");
        lia.innerHTML = "LIA har påbörjat!";
        clock.innerHTML = "<span>0</span><span>0</span><span>0</span><span>0</span>"
        clock.appendChild(lia);
        }
    }, 1000);
}

window.onload = function() {
    var dueDate = new Date("April 8, 2019 08:00:00").getTime();
    startTimer("#clock", dueDate)
}