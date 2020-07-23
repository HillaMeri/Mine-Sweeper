var gHintCell;
var gHintCount;
var gHint;

const LIME = ''

// var gIntervalHint;
function hintClicked(elImg) {
    if (!gGame.isOn || gFirstClick) return;
    if (elImg.src === "http://127.0.0.1:5500/img/1.png") return;
    gHint = true;
    elImg.src = "img/1.png";
    elImg.classList.add("hint-clicked");
}

function hintShow(i, j) {
    var cell = { i: i, j: j };
    var negs = openNegsWithBooms(gBoard, cell);
    gCanClick = false;
    gHint = false;
    setTimeout(() => {
        gCanClick = true;
        hintHide(negs);
    }, 1000);
}

function hintHide(negs) {
    for (var i = 0; i < negs.length; i++) {
        var selector = '.cell-' + negs[i].i + "-" + negs[i].j;
        hideCell(selector)
    }
}



function markSafeClick() {
    if (!gGame.safeClick || !gCanClick || gFirstClick) return;
    var empties = getAllLocations();
    if (!empties.length) return;
    //TODO: handle this case, no emptis - no hints
    var randCell = getRandomInteger(0, empties.length - 1);
    var randLocation = empties[randCell];

    while (gBoard[randLocation.i][randLocation.j].isShown) {
        empties.splice(randCell, 1);
        var randCell = getRandomInteger(0, empties.length - 1);
        var randLocation = empties[randCell];
        if (!empties.length) return;
    }

    showCell(randLocation.i, randLocation.j);

    setTimeout(() => {
        var selector = '.cell-' + randLocation.i + "-" + randLocation.j;
        hideCell(selector);
    }, 1000);
    gGame.safeClick--;
    renderSafeClick();
}
