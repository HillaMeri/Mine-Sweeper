function renderBoard(board) {
    var htmlStr = '';
    for (var i = 0; i < gLevel.size; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gLevel.size; j++) {
            var className = "cell-" + i + "-" + j;
            htmlStr += `<td class="cell  ${className} " onclick = "cellClicked(this, ${i},${j})" oncontextmenu="cellMarked(this,${i},${j})" data-idI="${i}data-idJ="${j}"></td>`;
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