var gInteravlTime;
var gTime;

function renderTimeLabel() {
    clearInterval(gInteravlTime);
    var elTime = document.querySelector('.time');
    elTime.innerHTML = '⏳Game Time:';
}


function renderTime() {
    var date = new Date();
    var milis = date.getTime();
    var secs = (milis - gTime) / 1000;
    gGame.secsPassed = secs;
    secs = secs.toFixed(0);
    var secsFixed = secs;
    var secsFixed = secs;
    if (secs < 100) secsFixed = addZeros(secs, '0');
    var elTime = document.querySelector('.time');
    elTime.innerHTML = secsFixed;
    gInteravlTime = setTimeout(renderTime, 100);
}


