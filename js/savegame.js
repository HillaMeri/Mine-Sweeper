
/* Function Description: when we save game we need to set all the game data in locl storage*/
function saveGame(game, board, level, time) {
    if(!gGame.isOn) return;
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(game, JSON.stringify(gGame));
        localStorage.setItem(board, JSON.stringify(gBoard));
        localStorage.setItem(level, JSON.stringify(gLevel));
        localStorage.setItem(time, gGame.secsPassed);
    }
    init(gLevel.size);
}

/* Function Description: open a save game, get all the save data og the game and
render the new data to the board with openGame function */
function openSaveGame(game, board, level, time) {
    if (localStorage.getItem(game) !== null &&
        localStorage.getItem(board) !== null &&
        localStorage.getItem(level) !== null) {
        clearInterval(gInteravlLive);
        clearInterval(gInteravlTime);
        gGame = JSON.parse(localStorage.getItem(game));
        gBoard = JSON.parse(localStorage.getItem(board));
        gLevel = JSON.parse(localStorage.getItem(level));
        gGame.secsPassed = JSON.parse(localStorage.getItem(time));
        openGame(gBoard);
    }
}

/* Function Description: open a save game, 
ןnitializes the saved game with all the information in it - render into the board. 
In addition creating a new time with the now time less time already play  */
function openGame(board) {
    randerBoard(board);
    renderNumbersOfGuess();
    gTime = new Date();
    gTime = gTime.getTime() - gGame.secsPassed * 1000;
    renderTime();
    renderEmoji();
    renderLives();
    renderScoreToAllLevels();
    renderSafeClick();
    closeModalMines();
    clearInterval(gInteravlLive);
    gInteravlLive = setInterval(modalLives, 1500);
    randerHintsForSaveGame();
}