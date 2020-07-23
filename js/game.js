'use strict'

var gLevel;
var gBoard;
var gGame;
var gMines;
var gLivesCount;
var gMinesInsert;
var gCanClick;
var gFirstClick;
var gPrevBoards;
var gInteravlLive;
var gMovesCount;
var gRevelMines;

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
    gPrevBoards = [];
    gMovesCount = 0;
    gMines = [];
    gMinesInsert = 0;
    gRevelMines = 0;
    gCanClick = true;
    gLevel = setLevel(size);
    gBoard = buildBoard();
    gPrevBoards = [];
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
    clearInterval(gInteravlLive);
    gInteravlLive = setInterval(modalLives, 1500)
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


function checkGameOver() {
    //TODO: Check why isn't working
    // if (gGame.markedCount + gGame.liveUsed === gLevel.mines || gGame.shownCount ===  gLevel.size * gLevel.size) {
    //     if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return;
    //     saveScore(gLevel.name, gGame.secsPassed);
    //     endGame('You win', true);
    // }

    if (gGame.markedCount + gGame.shownCount !== gLevel.size * gLevel.size) return;
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            if (gBoard[i][j].isMarked && !gBoard[i][j].isMine) return;
        }
    }
    saveScore(gLevel.name, gGame.secsPassed);
    endGame('You win', true);
}


function endGame(txt, win) {
    var elNewGame = document.querySelector('.new-game');
    elNewGame.innerText = win ? '🥰' : '😭';
    gGame.isOn = false;
    gCanClick = false;
    renderTimeLabel();
    clearInterval(gInteravlLive);
}


function modalLives() {
    var elModelLives = document.querySelector('.modal-live');
    elModelLives.classList.toggle('heartbeat');
}

