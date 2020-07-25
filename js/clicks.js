
/* Function Description: when cell clicked check all the edge cases
build new board- for manually or random. Take the time for first click,
active recursion if needed, reneder the clicked cell and save the prev board in - gGame.prevBoards
*/
function cellClicked(elCell, i, j) {
    var copyBoard = [];
    if (!gGame.isOn || gBoard[i][j].isShown || !gGame.canClick) return;
    if (gGame.manually && gGame.minesInsert < gLevel.mines) {
        buildManullayBoard(elCell, i, j);
    }
    else {
        closeModalMines();
        if (gHint) {
            hintShow(i, j);
            return;
        }
        copyBoard = deepCopyBoard(gBoard);
        gGame.prevBoards.push(copyBoard);
        if (!gGame.shownCount) {
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
        if (gBoard[i][j].element === MINE) clickedMine(elCell);
        cellChange(i, j, elCell, false);
        checkGameOver();
        gGame.firstClick = false;
    }
}


/* Function Description: when cell clicked on left mouse we put geuss on the cell
and check if the game is over */
function cellMarked(elCell, i, j) {
    event.preventDefault();
    if (!gGame.canClick || gBoard[i][j].isShown) return;
    copyBoard = deepCopyBoard(gBoard);
    gGame.prevBoards.push(copyBoard);
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


/* Function Description: if we click on mine we need to check our lives
if we loose- print all the mines on the board and end game */
function clickedMine(elChoose) {
    gGame.livesCount--;
    gGame.minesExpoed++;
    mineSound();
    if (!gGame.livesCount) {
        for (var i = 0; i < gGame.mines.length; i++) {
            var cell = gGame.mines[i];
            var selector = '.cell-' + cell.i + "-" + cell.j;
            var elCell = document.querySelector(selector);
            cellChange(cell.i, cell.j, elCell);
        }
        elChoose.style.backgroundColor = 'rgb(209, 30, 30)';
        endGame(false, 'You Loose');
    } else {
        renderLives();
    }
}

/* Function Description: if we want to go back step- 
we have all the previous boards in - gPrevBoard
we go to the last place and recover the last board
we cant recover the first click */
function goBack() {
    if (gGame.prevBoards.length <= 1 || !gGame.canClick) return;
    var board = gGame.prevBoards.splice(gGame.prevBoards.length - 1, 1);
    gBoard = deepCopyBoard(board[0]);
    randerBoard(gBoard);
}

/* Function Description: on double click we get all the negs 
in condition: there is no unShown/unmarked mines this feature is
only for shown cells */
function revelNegs(i, j) {
    var pos = { i: i, j: j };
    if (gBoard[i][j].isShown) {
        copyBoard = deepCopyBoard(gBoard);
        gGame.prevBoards.push(copyBoard);
        openNegsForDubleClick(gBoard, pos);
    }
    checkGameOver();
}