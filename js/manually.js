
function manuallyPositionClicked() {
    newGame();
    openModalMines();
    gGame.manually = true;
}

function openModalMines() {
    var elModal = document.querySelector('.modal-mines-manually');
    var txt = `Insert ${gLevel.mines - gMinesInsert}  💣`;
    if (gLevel.mines - gMinesInsert === 0) txt = 'GoodLuck'
    elModal.style.display = 'block';
    elModal.innerText = txt;
}

function closeModalMines() {
    var elModal = document.querySelector('.modal-mines-manually');
    elModal.style.display = 'none';
    elModal.innerText = '';
}

function buildManullayBoard(elCell, i, j) {
    gMinesInsert++;
    cellPutMines(elCell, i, j, gBoard);
}

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
    if(flag) return;
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

