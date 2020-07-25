var gInteravlTime;
var gTime;


/* Function Description: at game startup we print a clock time */
function renderTimeLabel() {
    clearInterval(gInteravlTime);
    var elTime = document.querySelector('.time');
    elTime.innerHTML = '⏳Game Time:';
}

/* Function Description: work with interval each sec: take the time now
and reduces the time we start the game and show it to the user.
in addition: update the secs of the game. */
function renderTime() {
    var date = new Date();
    var milis = date.getTime();
    var secs = (milis - gTime) / 1000;
    gGame.secsPassed = secs;
    secs = secs.toFixed(0);
    var secsFixed = secs;
    if (secs < 100) secsFixed = addZeros(secs, '0');
    var elTime = document.querySelector('.time');
    elTime.innerHTML = secsFixed;
    gInteravlTime = setTimeout(renderTime, 100);
}


