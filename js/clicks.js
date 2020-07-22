

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown) return;
    if(gHint) {
        hintShow(i,j);
        return;
    }
    if (gGame.shownCount === 0) {
        if (gBoard[i][j].element === MINE) init();
        gTime = new Date();
        gTime = gTime.getTime();
        renderTime();
    }
    if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].element !== MINE) {
        expandShown(gBoard, elCell, i, j);
    }
    if (gBoard[i][j].element === MINE) clickedBoom();
    cellChange(i, j, elCell)
    checkGameOver();
    console.log(gBoard);
}




//TODO:Called on right click to mark a cell (suspected to be a mine)Search the web (and
//implement) how to hide the context menu on right click
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
    for (var i = 0; i < gMines.length; i++) {
        var cell = gMines[i];
        var selector = '.cell-' + cell.i + "-" + cell.j;
        var elCell = document.querySelector(selector);
        cellChange(cell.i, cell.j, elCell);
    }
    endGame('you loose',false);
}


function expandShown(board, elCell, i, j) {
    var pos = { i: i, j: j }
    openNegs(board, pos)
}

