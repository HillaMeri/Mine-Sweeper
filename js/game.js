'use strict'

var gLevel;
var gBoard;
var gGame;
var gMines;
var gLivesCount;
var gMoves;
var gMinesInsert;
var gCanClick;
var gFirstClick;
var gOldBoards;


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
    gOldBoards = [];
    gMoves = [];
    gMines = [];
    gMinesInsert = 0;
    gCanClick = true;
    gLevel = setLevel(size);
    gBoard = buildBoard();
    gOldBoards.push(gBoard);
    gLivesCount = 3;
    gFirstClick = true;
    renderBoard(gBoard);
    randerHints();
    renderTimeLabel();
    renderNumbersOfGuess();
    renderEmoji();
    renderLives();
    renderScoreToAllLevels();
    renderSafeClick();
    closeModalMines();
    modalLives('visible');
}    

function setLevel(size) {
    var level;
    switch (size) {
        case 4: {
            level = {
                size: 4,
                mines: 2,
                name: "Easy"
            }    
            break;
        }    
        case 8: {
            level = {
                size: 8,
                mines: 12,
                name: "Hard"
            }    
            break;
        }    
        case 12: {
            level = {
                size: 12,
                mines: 30,
                name: "Extrenel"
            }    
            break;
        }    
        default: {
            level = {
                size: 4,
                mines: 2,
                name: "Easy"
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
    gMines.push(randLocation);
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
        if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return;        
        saveScore(gLevel.name, gGame.secsPassed);
        endGame('You win', true);
    }    
}    

function endGame(txt, win) {
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = win ? '🥰' : '😭';
    gGame.isOn = false;
    gCanClick = false;
    renderTimeLabel();
    clearTimeout(gInteravlTime);
    modalLives('hidden');
}    


function modalLives(visbility){
    var elModelLives = document.querySelector('.modal-live');
    elModelLives.style.visibility = visbility;
}

