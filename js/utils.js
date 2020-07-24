

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMinesNegsCount(board, pos) {
    var count = countNegs(board, pos);
    gBoard[pos.i][pos.j].minesAroundCount = count;
    if (gBoard[pos.i][pos.j].element === EMPTY) gBoard[pos.i][pos.j].element = gBoard[pos.i][pos.j].minesAroundCount;
}

function countNegs(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine === true) count++;
        }
    }
    return count;
}

function openNegsForDubleClick(board, pos) {
    var flag = true;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine && !board[i][j].isShown && board[i][j].isMine && !board[i][j].isMarked) {
                flag = false;
                return;
            }
        }
    }
    if (!flag) return;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine === false && !board[i][j].isMarked && !board[i][j].isShown) {
                var selector = '.cell-' + i + "-" + j;
                var elCell = document.querySelector(selector);
                cellChange(i, j, elCell, true);
                openNegs(board, { i: i, j: j });
            }
        }
    }
}

//for empty places
function openNegs(board, pos) {
    var movesNegs = [];
    if (board[pos.i][pos.j].minesAroundCount) return;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (!board[i][j].isMine && !board[i][j].isMarked && !board[i][j].isShown) {
                if (board[i][j].isShown) continue;
                var selector = '.cell-' + i + "-" + j;
                var elCell = document.querySelector(selector);
                cellChange(i, j, elCell, true);
                openNegs(board, { i: i, j: j });
            }
        }
    }
}

function expandShown(board, elCell, i, j) {
    var pos = { i: i, j: j };
    var l = openNegs(board, pos);
}

function openNegsWithBooms(board, pos) {
    var negs = [];
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (!board[i][j].isMarked && !board[i][j].isShown) {
                showCell(i, j);
                negs.push({ i: i, j: j });
            }
        }
    }
    return negs;
}

function showCell(i, j) {
    var selector = '.cell-' + i + "-" + j;
    var elCell = document.querySelector(selector);
    elCell.innerText = gBoard[i][j].element;
}

function hideCell(selector) {
    var elCell = document.querySelector(selector);
    elCell.innerText = '';
}

function hideCells() {
    for (var i = 0; i < gMines.length; i++) {
        var selector = '.cell-' + gMines[i].i + "-" + gMines[i].j;
        hideCell(selector);
    }
    updateNegs();
}

function cellChange(i, j, elCell, isNegs = false) {
    if (gBoard[i][j].isShown) return;
    if (gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = false;
        gGame.markedCount--;
        renderNumbersOfGuess();
    }
    elCell.innerText = gBoard[i][j].element ? gBoard[i][j].element : '';
    gBoard[i][j].isShown = true;
    elCell.classList.add('clicked-Cell');
    gGame.shownCount++;
    // var move = [{ i: i, j: j }];
    // if (!isNegs) gMoves.push(move);
}

function checkIfInBoard(board, pos) {
    return (pos.i >= 0 && pos.i < board.length &&
        pos.j >= 0 && pos.j < board[pos.i].length);
}

///return an array with all the coords in the board
function getAllLocations() {
    var spaces = [];
    for (var i = 0; i < gLevel.size; i++) {
        for (var j = 0; j < gLevel.size; j++) {
            var coord = { i: i, j: j };
            if (!gBoard[i][j].isMine) spaces.push(coord);
        }
    }
    return spaces;
}

function addZeros(num, sign) {
    var newNum = sign;
    newNum += Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
    return newNum;
}


function copyAllBoard(board) {
    var copyBoard = [];
    for (var i = 0; i < board.length; i++) {
        copyBoard[i] = [];
        for (var j = 0; j < board.length; j++){
           
           
            var minesAroundCountCopy =  board[i][j].minesAroundCount;
            var isShownCopy =  board[i][j].isShown;
            var isMineCopy = board[i][j].isMine;
            var isMarkedCopy = board[i][j].isMarked;
            var elementCopy = board[i][j].element;
            
            var cellCopy = {
                minesAroundCount: minesAroundCountCopy,
                isShown: isShownCopy,
                isMine : isMineCopy,
                isMarked : isMarkedCopy,
                element: elementCopy
            }

            copyBoard[i][j] = cellCopy;
        }
    }
    return copyBoard;
}
