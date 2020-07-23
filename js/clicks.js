
function cellClicked(elCell, i, j) {
    var copyBoard = [];
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown || !gCanClick) return;
    if (gGame.manually && gMinesInsert < gLevel.mines) {
        buildManullayBoard(elCell, i, j);
    }
    else {
        closeModalMines();
        if (gHint) {
            hintShow(i, j);
            return;
        }
        if (!gGame.shownCount) {
            copyBoard = copyAllBoard(gBoard);
            gPrevBoards.push(copyBoard);
            if (!gGame.manually) {
                gBoard = getMinesLocations(gBoard, { i: i, j: j });
                updateNegs();
            }

            gTime = new Date();
            gTime = gTime.getTime();
            renderTime();
        }
        if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].element !== MINE) {
            expandShown(gBoard, elCell, i, j);
        }
        if (gBoard[i][j].element === MINE) clickedBoom(elCell);
        cellChange(i, j, elCell, false);
        checkGameOver();
        gFirstClick = false;
    }
    gMovesCount++;
    copyBoard = copyAllBoard(gBoard);
    gPrevBoards.push(copyBoard);
}

function cellMarked(elCell, i, j) {
    event.preventDefault();
    if (!gCanClick || gBoard[i][j].isShown) return;
    if (!gBoard[i][j].isMarked) {
        elCell.innerText = GEUSS;
        gGame.markedCount++;
    } else {
        gGame.markedCount--;
        elCell.innerText = '';
    }
    gBoard[i][j].isMarked = !gBoard[i][j].isMarked;
    checkGameOver();
    renderNumbersOfGuess();
}

function clickedBoom(elChoose) {
    gRevelMines++;
    gGame.liveUsed++;
    gLivesCount--;
    if (gLivesCount < 0) {
        for (var i = 0; i < gMines.length; i++) {
            var cell = gMines[i];
            var selector = '.cell-' + cell.i + "-" + cell.j;
            var elCell = document.querySelector(selector);
            cellChange(cell.i, cell.j, elCell);
        }
        elChoose.style.backgroundColor = 'rgb(209, 30, 30)';
        endGame('you loose', false);
    }
    renderLives();
}


function goBack() {
    if (gMovesCount < 1 || gPrevBoards.length === 2 || !gCanClick) return;
    var board = gPrevBoards.splice(gPrevBoards.length - 2, 1);
    gBoard = copyAllBoard(board[0]);
    randerBoardForUndo(gBoard);
    gMovesCount--;
}


function newGame() {
    var size = gLevel.size;
    init(size);
}


function revelNegs(i, j) {
    var pos = { i: i, j: j };
    if (gBoard[i][j].isShown) {
        openNegsForDubleClick(gBoard, pos);
    }
}