'use strict'

var gLevel;
var gBoard;
var gGame;
var gMines;
var gLivesCount;
var gMoves;
var gMinesInsert;
var gCanClick;


const MINE = '💣'
const EMPTY = '';
const GEUSS = '🚩';


function init(size = 4) {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        liveUsed: 0,
        safeClick: 3,
        manually: false
    }    
    gMoves = [];
    gMines = [];
    closeModal();
    gMinesInsert = 0;
    gCanClick = true;
    gLevel = setLevel(size);
    gBoard = buildBoard();
    randerHints();
    renderBoard(gBoard);
    gLivesCount = 3;
    renderTimeLabel();
    renderNumbersOfGuess();
    renderEmoji();
    renderLives();

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
    return board;
}    


function getMinesLocations(board, location) {
    gMines = [];
    var locations = getAllLocations();
    for (var i = 0; i < gLevel.mines; i++) {
        var randNumb = getRandomInteger(0, locations.length - 1);
        var randLocation = locations[randNumb];
        while (randLocation.i === location.i && randLocation.j === location.j) {
            randNumb = getRandomInteger(0, locations.length - 1);
            randLocation = locations[randNumb];
        }    
        locations.splice(randNumb, 1);
        insertMines(randLocation, board);
    }    
    return board;
}    


function insertMines(randLocation, board) {
    var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: true,
        isMarked: false,
        element: MINE
    }    
    board[randLocation.i][randLocation.j] = cell;
    console.log("insertMines -> randLocation", randLocation)
    gMines.push(randLocation);
    console.log("insertMines -> gMines", gMines)
}    


function updateNegs(cell) {
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            setMinesNegsCount(gBoard, { i: i, j: j })
        }    
    }    
}    


function checkGameOver() {
    if (gGame.markedCount + gGame.liveUsed === gLevel.mines) {
        if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return
        endGame('You win', true);
    }    
}    

function endGame(txt, win) {
    openModal(txt);
    var elNewGame = document.querySelector('.new-game');
    clearTimeout(gInteravlTime);
    elNewGame.innerText = win ? '🥰' : '😭';
    renderTimeLabel();
    gGame.isOn = false;
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

function cellPutMines(elCell, i, j, board) {
    gGame.manually = true;
    var location = { i: i, j: j };
    if (gMines.includes(location)) {
        gMinesInsert--;
        return;
    }
    insertMines(location, board);
    showCell(i, j);
    if (gMinesInsert === gLevel.mines) {
        gCanClick = false;
        setTimeout(() => {
            gCanClick = true;
            hideCells()
        }, 1000);
    }
}

function hideCells() {
    for (var i = 0; i < gMines.length; i++) {
        var selector = '.cell-' + gMines[i].i + "-" + gMines[i].j;
        hideCell(selector);
    }
    updateNegs();
}