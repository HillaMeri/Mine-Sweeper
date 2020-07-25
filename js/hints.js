var gHint;

/* Function Description: if lamp-hint clicked
change the lamp color and change the status to gHint is on
now that its on when we click on cell we reveal it and is negs*/
function hintClicked(elImg) {
    if (!gGame.isOn || gGame.firstClick) return;
    if (elImg.src === "img/1.png") return;
    //if (elImg.src === "http://127.0.0.1:5500/img/1.png") return;
    gHint = true;
    elImg.src = "img/1.png";
    elImg.classList.add("hint-clicked");
    gGame.hints = saveHintsClicked();
}

function saveHintsClicked() {
    var elHints = document.querySelector('.hints');
    return elHints.innerHTML;
}

/* Function Description: open the cell and the negs for second*/
function hintShow(i, j) {
    var cell = { i: i, j: j };
    var negs = openNegsWithBooms(gBoard, cell);
    gGame.canClick = false;
    gHint = false;
    setTimeout(() => {
        gGame.canClick = true;
        hintHide(negs);
    }, 1000);
}

/* Function Description: close the cell and the negs */
function hintHide(negs) {
    for (var i = 0; i < negs.length; i++) {
        var selector = '.cell-' + negs[i].i + "-" + negs[i].j;
        hideCell(selector)
    }
}

/* Function Description: get all the un shown cells in the board,
if only mines left- return
take a random place until un shown, show the cell for second*/
function markSafeClick() {
    if (!gGame.safeClick || !gGame.canClick || gGame.firstClick) return;
    var empties = getAllLocations();
    if (!empties.length) return;
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