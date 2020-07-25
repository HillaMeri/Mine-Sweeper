'use strict'
var gLevel;
var gBoard;
var gGame;
var gInteravlLive;

//ELEMENTS
const MINE = '💣'
const EMPTY = '';
const GEUSS = '🚩';


/* Function Description: initialize the game */
function init(size = 4) {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        safeClick: 3,
        manually: false,
        prevBoards: [],
        mines: [],
        minesInsert: 0,
        revelMines: 0,
        canClick: true,
        livesCount: 3,
        firstClick: true,
        hints: '',
        minesExpoed: 0
    }
    gLevel = setLevel(size);
    gBoard = buildBoard();
    randerBoard(gBoard);
    randerHints();
    renderTimeLabel();
    renderNumbersOfGuess();
    renderEmoji();
    renderLives();
    renderScoreToAllLevels();
    renderSafeClick();
    closeModalMines();
    clearInterval(gInteravlLive);
    gInteravlLive = setInterval(modalLives, 1500);
}

/* Function Description: get input from the user and 
set the size of the board the number of mines- gLevel */
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

/* Function Description: build the board with default inputs */
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

/* Function Description: every click on cell, check if: 
1. The marked cell and expoed mines are the nums of mines in the game
2. All the shown and marked cells are the nums of the cells in the board.
If end game- save the score */
function checkGameOver() {
    if (gGame.markedCount + gGame.minesExpoed === gLevel.mines ||
         gGame.shownCount ===  gLevel.size * gLevel.size) {
        if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return;
        playVictorySound();
        saveScore(gLevel.name, gGame.secsPassed);
        endGame(true,'You Win !');
    }
}

/* Function Description: if the game end, check from the input if it was
win or loose, print the relevant emoji */
function endGame(win,msg) {
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = win ? '🥰' : '😭';
    gGame.isOn = false;
    gGame.canClick = false;
    clearInterval(gInteravlLive); 
    msgOfWinOrLoose(msg);
    clearInterval(gInteravlTime); 
}

/* Function Description: this function work with interval from init function,
prints in beats the num of lives left */
function modalLives() {
    var elModelLives = document.querySelector('.modal-live');
    elModelLives.classList.toggle('heartbeat');
}


function msgOfWinOrLoose(msg) {
    var elModelLives = document.querySelector('.modal-live');
    elModelLives.innerText = msg;
}


/* Function Description: start a new game */
function newGame() {
    var size = gLevel.size;
    init(size);
}


function playVictorySound(){
    var elVicAudio = document.querySelector('.victory-sound');
    elVicAudio.play();
}