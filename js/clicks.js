
/* Function Description: when cell clicked check all the edge cases
build new board- for manually or random. Take the time for first click,
active recursion if needed, reneder the clicked cell and save the prev board in - gPrevBoards
 */
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
            if (!gGame.manually) {
                gBoard = getMinesLocations(gBoard, { i: i, j: j });
                updateNegs();
            }
            copyBoard = copyAllBoard(gBoard);
            gPrevBoards.push(copyBoard);
            gTime = new Date();
            gTime = gTime.getTime();
            renderTime();
        }
        if (gBoard[i][j].minesAroundCount === 0 && gBoard[i][j].element !== MINE) {
            expandShown(gBoard, elCell, i, j);
        }
        if (gBoard[i][j].element === MINE) clickedMine(elCell);
        cellChange(i, j, elCell, false);
        checkGameOver();
        gFirstClick = false;
    }
    gMovesCount++;
    copyBoard = copyAllBoard(gBoard);
    gPrevBoards.push(copyBoard);
}



/* Function Description: when cell clicked on left mouse we put geuss on the cell
and check if the game is over */
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
    copyBoard = copyAllBoard(gBoard);
    gPrevBoards.push(copyBoard);
    checkGameOver();
    renderNumbersOfGuess();
}


/* Function Description: if we click on mine we need to check our lives
if we loose- print all the mines on the board and end game */
function clickedMine(elChoose) {
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

/* Function Description: if we want to go back step- 
we have all the previous boards in - gPrevBoard
we go to the last place and recover the last board
we cant recover the first click */
function goBack() {
    if (gMovesCount < 1 || gPrevBoards.length === 2 || !gCanClick) return;
    var board = gPrevBoards.splice(gPrevBoards.length - 2, 1);
    gBoard = copyAllBoard(board[0]);
    randerBoardForUndo(gBoard);
    gMovesCount--;
}

/* Function Description: on double click we get all the negs 
in condition: there is no unShown/unmarked mines this feature is
only for shown cells */
function revelNegs(i, j) {
    var pos = { i: i, j: j };
    if (gBoard[i][j].isShown) {
        openNegsForDubleClick(gBoard, pos);
    }
    checkGameOver();
}