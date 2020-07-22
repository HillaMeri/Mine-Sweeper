'use strict'

var gLevel;
var gBoard;
var gGame;
var gMines;


const MINE = '💣'
const EMPTY = '';
const GEUSS = '🚩';


function init(size = 4) {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    closeModal();
    gLevel = setLevel(size);
    buildBoard();
    gBoard = buildBoard();
    updateNegs();
    randerHints();
    renderBoard(gBoard);
    renderTimeLabel();
    renderNumbersOfGuess(); 
    renderEmoji();
}

function setLevel(size) {
    var level;
    switch (size) {
        case 4: {
            level = {
                size: 4,
                mines: 2
            }
            break;
        }
        case 8: {
            level = {
                size: 8,
                mines: 12
            }
            break;
        }
        case 12: {
            level = {
                size: 12,
                mines: 30
            }
            break;
        }
        default: {
            level = {
                size: 4,
                mines: 2
            }
            break;
        }
    }
    return level;
}

function buildBoard() {
    //TODO: buld a board, set mines at random locations
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            var coord = { i: i, j: j };
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                element: EMPTY
            }
            board[i][j] = cell;
        }
    }
    board = getMinesLocations(board);
    return board;
}


//return locations of mines
function getMinesLocations(board) {
    gMines = [];
    var locations = getAllLocations();
    for (var i = 0; i < gLevel.mines; i++) {
        var randNumb = getRandomInteger(0, locations.length - 1);
        var randLocation = locations[randNumb];
        locations.splice(randLocation, 1);
        var cell = {
            minesAroundCount: 0,
            isShown: false,
            isMine: true,
            isMarked: false,
            element: MINE
        }
        board[randLocation.i][randLocation.j] = cell;
        gMines.push(randLocation);
    }
    return board;
}


function updateNegs() {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            setMinesNegsCount(gBoard, { i: i, j: j })
        }
    }
}

function renderBoard(board) {
    //TODO: Render the board as a <table>to the page
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

function checkGameOver() {
    if (gGame.markedCount === gLevel.mines) {
        if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return
         endGame('You win', true);
    }
}

function endGame(txt, win) {
    openModal(txt);
    var elNewGame = document.querySelector('.new-game');

    elNewGame.innerText = win?  '🥰' : '😭';
    renderTimeLabel();
    gGame.isOn = false;
}

function renderEmoji(){
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = '😄';
}

function openModal(msg) {
    var elModal = document.querySelector('.modal-win');
    elModal.style.display = 'block';
    elModal.innerText = msg;
}

function closeModal() {
    var elModal = document.querySelector('.modal-win');
    elModal.style.display = 'none';
    elModal.innerText = '';
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

