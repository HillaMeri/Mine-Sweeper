

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown || !gCanClick) return;
    if (gGame.manually && gMinesInsert < gLevel.mines) {
        gMinesInsert++;
        cellPutMines(elCell, i, j, gBoard);
    }
    else {
        if (!gGame.shownCount) {
            if (!gGame.manually) {
                gBoard = getMinesLocations(gBoard, { i: i, j: j });
                updateNegs();
            }
            gTime = new Date();
            gTime = gTime.getTime();
            renderTime();
        }
        if (gHint) {
            hintShow(i, j);
            return;
        }
        if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].element !== MINE) {
            expandShown(gBoard, elCell, i, j);
        }
        if (gBoard[i][j].element === MINE) clickedBoom();
        cellChange(i, j, elCell, false);
        checkGameOver();

        console.log('gMines', gMines);

    }
}



function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown) {
        event.preventDefault();
        return;
    }
    if (gBoard[i][j].isMarked === false) {
        elCell.innerText = GEUSS;
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
        elCell.innerText = '';
    }
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
    event.preventDefault();
    checkGameOver();
    renderNumbersOfGuess();
}


function clickedBoom() {
    gGame.liveUsed++;
    gLivesCount--;
    if (gLivesCount === 0) {
        for (var i = 0; i < gMines.length; i++) {
            var cell = gMines[i];
            var selector = '.cell-' + cell.i + "-" + cell.j;
            var elCell = document.querySelector(selector);
            cellChange(cell.i, cell.j, elCell);
        }
        endGame('you loose', false);
    }
    renderLives();
}



function markSafeClick() {
    if (!gGame.safeClick) return;
    var empties = getAllLocations();
    var randCell = getRandomInteger(0, empties.length - 1);
    var randLocation = empties[randCell];
    console.log(randLocation);
    while (gBoard[randLocation.i][randLocation.j].isShown) {
        empties.splice(randCell, 1);
        var randCell = getRandomInteger(0, empties.length - 1);
        var randLocation = empties[randCell];
    }

    showCell(randLocation.i, randLocation.j);
    setTimeout(() => {
        var selector = '.cell-' + randLocation.i + "-" + randLocation.j;
        hideCell(selector);
    }, 1000);
    gGame.safeClick--;
}

function goBack() {
    if (!gMoves.length) return;
    var move = gMoves.splice(gMoves.length - 1, 1);
    var moves = [];
    moves.push(...move[0]);
    for (var i = 0; i < moves.length; i++) {
        var selector = '.cell-' + moves[i].i + "-" + moves[i].j;
        var elCell = document.querySelector(selector);
        elCell.innerText = '';
        gBoard[moves[i].i][moves[i].j].isShown = false;
        elCell.classList.remove('clicked-Cell');
        gGame.shownCount--;
    }

}

function manuallyPositionClicked() {
    init();
    gGame.manually = true;
}


