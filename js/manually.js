
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
    var txt = `Insert ${gLevel.mines - gMinesInsert}  💣`;
    if (gLevel.mines - gMinesInsert === 0) txt = 'GoodLuck'
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
    gMinesInsert++;
    cellPutMines(elCell, i, j, gBoard);
}

/* Function Description: each mine, put in the place, if the user clicked
on same cell twice- return*/
function cellPutMines(elCell, i, j, board) {
    var location = { i: i, j: j };
    var flag = false;
    for (var m = 0; m < gMines.length; m++) {
        if (gMines[m].i === i && gMines[m].j === j) {
            gMinesInsert--;
            flag = true;
            return;
        }
    }
    if (flag) return;
    openModalMines();
    insertMines(location, board);
    showCell(i, j);
    if (gMinesInsert === gLevel.mines) {
        gCanClick = false;
        setTimeout(() => {
            gCanClick = true;
            closeModalMines();
            hideCells()
        }, 1000);
    }
}

