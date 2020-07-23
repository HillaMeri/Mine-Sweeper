
function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown || !gCanClick) return;
    if (gGame.manually && gMinesInsert < gLevel.mines) {
       buildManullayBoard(elCell, i, j);   
    }
    else {
        closeModalMines();
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
        if (gBoard[i][j].element === MINE) clickedBoom(elCell);

        cellChange(i, j, elCell, false);
        checkGameOver();
        gFirstClick = false;
    }
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
    if (!gMoves.length || !gCanClick) return;
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

// function goBack() {
//     if (!gMoves.length || !gCanClick) return;

//     var board = gOldBoards.splice(gOldBoards.length-1, 1);
//     console.log("goBack -> gOldBoards", gOldBoards)
//     // var boards = [];
//     // boards.push(...board[0]);
//     console.log('board',board[0]);

//     randerBoardForUndo(board[0]);
// }


function goBack() {
    if (!gMoves.length || !gCanClick) return;
    var move = gMoves.splice(gMoves.length - 2, 1);
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

function newGame() {
    var size = gLevel.size;
    init(size);
}

function revelNegs(i,j){
    var pos = {i:i,j:j};
    if(gBoard[i][j].isShown) {
        openNegsForDubleClick(gBoard,pos);
    }
}