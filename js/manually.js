
/* Function Description: change the status to manual,
now when cell click it will be for insert mines*/
function manuallyPositionClicked() {
    newGame();
    openModalMines();
    gGame.manually = true;
}

/* Function Description: open modal for how much mines left to insert*/
function openModalMines() {
    var elModal = document.querySelector('.modal-mines-manually');
    var txt = `Insert ${gLevel.mines - gGame.minesInsert}  💣`;
    if (gLevel.mines - gGame.minesInsert === 0) txt = 'GoodLuck'
    elModal.style.display = 'block';
    elModal.innerText = txt;
}

/* Function Description: close the modal for how much mines left to insert*/
function closeModalMines() {
    var elModal = document.querySelector('.modal-mines-manually');
    elModal.style.display = 'none';
    elModal.innerText = '';
}

/* Function Description: build a board respectively to the input mines*/
function buildManullayBoard(elCell, i, j) {
    gGame.minesInsert++;
    cellPutMines(elCell, i, j, gBoard);
}

/* Function Description:for each mine, put in the choosen place,
 if the user clicked on same cell twice- return.
 update the modal how much mines left, after all mines inserted close 
 all the shown mines cells*/
function cellPutMines(elCell, i, j, board) {
    var location = { i: i, j: j };
    var flag = false;
    for (var m = 0; m < gGame.mines.length; m++) {
        if (gGame.mines[m].i === i && gGame.mines[m].j === j) {
            gGame.minesInsert--;
            flag = true;
            return;
        }
    }
    if (flag) return;
    openModalMines();
    insertMines(location, board);
    showCell(i, j);
    if (gGame.minesInsert === gLevel.mines) {
        gGame.canClick = false;
        setTimeout(() => {
            gGame.canClick = true;
            closeModalMines();
            hideCells()
        }, 1000);
    }
}

