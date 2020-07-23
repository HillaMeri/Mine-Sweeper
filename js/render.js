function renderBoard(board) {
    var htmlStr = '';
    for (var i = 0; i < gLevel.size; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            var className = "cell-" + i + "-" + j;
            htmlStr += `<td class="cell  ${className} " onclick = "cellClicked(this, ${i},${j})" 
            oncontextmenu="cellMarked(this,${i},${j})" ondblclick="revelNegs(${i},${j})"></td>`;
        }
        htmlStr += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = htmlStr;

}

function randerBoardForUndo(board) {
    var htmlStr = '';
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    for (var i = 0; i < gLevel.size; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            var el = '';
            var addClass = " ";
            if (board[i][j].isMarked) {
                el = GEUSS;
                gGame.markedCount++;
            }
            if (board[i][j].isShown) {
                gGame.shownCount++;
                el = board[i][j].element ? board[i][j].element : '';
                addClass = "clicked-Cell";
                if(board[i][j].element === MINE) gRevelMines--;
            }
            
            var className = "cell-" + i + "-" + j;
            htmlStr += `<td class="cell ${className} ${addClass} "
             onclick = "cellClicked(this, ${i},${j})" 
            oncontextmenu="cellMarked(this,${i},${j})" 
            ondblclick="revelNegs(${i},${j})">${el}</td>`;
        }
        htmlStr += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = htmlStr;
}


function renderNumbersOfGuess() {
    var elNum = document.querySelector('.number');
    var num = gLevel.mines - gGame.markedCount;
    var numToPrint = '';
    console.log(num);
    if (num < 100) numToPrint = addZeros(num, '0');
    if (num < 0) numToPrint = addZeros(num, '-');
    elNum.innerText = numToPrint;
}

function renderEmoji() {
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = '😄';
}


function renderLives() {
    var elLives = document.querySelector('.modal-live');
    elLives.innerText = (gLivesCount >= 0) ? 'YOU HAVE ' + gLivesCount + ' LIVES ❤' : '';
}


function randerHints() {
    gHint = false;
    var elHints = document.querySelector('.hints');
    elHints.innerHTML = `<img src="img/2.png" onclick="hintClicked(this)"
     /><img src="img/2.png" onclick="hintClicked(this)" />
    <img src="img/2.png" onclick="hintClicked(this)" />`
}


function renderSafeClick() {
    var sign = '';
    for (var i = 0; i < gGame.safeClick; i++) {
        sign += '🤞';
    }
    if (!gGame.safeClick) sign = '❌'
    var elSafeClick = document.querySelector('.safe-click');
    elSafeClick.innerText = sign;

}