
function randerBoard(board) {
    var htmlStr = '';
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.minesExpoed = 0;
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
                if (board[i][j].element === MINE) gGame.minesExpoed++;
                gGame.shownCount++;
                el = board[i][j].element ? board[i][j].element : '';
                addClass = "clicked-Cell";
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

/* Function Description: update on the board how many guesses are left*/
function renderNumbersOfGuess() {
    var elNum = document.querySelector('.number');
    var num = gLevel.mines - gGame.markedCount;
    var numToPrint = '';
    if (num < 100) numToPrint = addZeros(num, '0');
    if (num < 0) numToPrint = addZeros(num, '-');
    elNum.innerText = numToPrint;
}

/* Function Description: update on the board in init emoji*/
function renderEmoji() {
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = '😄';
}


/* Function Description: update on the board how much lives left-
Each exposure of mine it change */
function renderLives() {
    var elLives = document.querySelector('.modal-live');
    elLives.innerText = (gGame.livesCount >= 0) ? 'YOU HAVE ' + gGame.livesCount + ' LIVES ❤' : '';
}

/* Function Description: put the lamps imgs of hints in the board  */
function randerHints() {
    gHint = false;
    var elHints = document.querySelector('.hints');
    elHints.innerHTML = `<img src="img/2.png" onclick="hintClicked(this)"/>
    <img src="img/2.png" onclick="hintClicked(this)" />
    <img src="img/2.png" onclick="hintClicked(this)" />`
    gGame.hints = elHints.innerHTML;
}

/* Function Description: put the safe click on the board, each time safe click used
the sign go down until the hints over */
function renderSafeClick() {
    var sign = '';
    for (var i = 0; i < gGame.safeClick; i++) {
        sign += '🤞';
    }
    if (!gGame.safeClick) sign = '❌'
    var elSafeClick = document.querySelector('.safe-click');
    elSafeClick.innerText = sign;
}

/* Function Description: when we save game we need to save the html of hints imgs*/
function randerHintsForSaveGame() {
    var elHints = document.querySelector('.hints');
    elHints.innerHTML = gGame.hints;
}

// function renderBoard(board) {
//     var htmlStr = '';
//     for (var i = 0; i < gLevel.size; i++) {
//         htmlStr += '<tr>';
//         for (var j = 0; j < gLevel.size; j++) {
//             var className = "cell-" + i + "-" + j;
//             htmlStr += `<td class="cell  ${className} " onclick = "cellClicked(this, ${i},${j})" 
//             oncontextmenu="cellMarked(this,${i},${j})" ondblclick="revelNegs(${i},${j})"></td>`;
//         }
//         htmlStr += '</tr>';
//     }
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = htmlStr;
// }
