
/* Function Description:  return random int */
function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Function Description: put for each cell how much negs mines it has
get from countNegs function the count*/
function setMinesNegsCount(board, pos) {
    var count = countNegs(board, pos);
    gBoard[pos.i][pos.j].minesAroundCount = count;
    if (gBoard[pos.i][pos.j].element === EMPTY) gBoard[pos.i][pos.j].element = gBoard[pos.i][pos.j].minesAroundCount;
}

/* Function Description: get a position. return the count of mines negs 
by over all the negs with a loops*/
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

/* Function Description: open the 'not mines' cell if double click on cell 
at first- check if there is a mine in the negs or marked cell- return 
else- open the negs recuresly*/
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

/* Function Description: open recuresevly all the un-mines negs of negs of empty cell-
Stop conditions: cell with mine*/
function openNegs(board, pos) {
    // var movesNegs = [];
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

/* Function Description: check if position is in the board- for negs table*/
function checkIfInBoard(board, pos) {
    return (pos.i >= 0 && pos.i < board.length &&
        pos.j >= 0 && pos.j < board[pos.i].length);
}

/* Function Description: create object cell and call to openNegs function*/
function expandShown(board, elCell, i, j) {
    var pos = { i: i, j: j };
    openNegs(board, pos);
}

/* Function Description: if hint is clicked and than click on cell we 
get all the negs of the cell, in this case- include mines*/
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

/* Function Description: took a hint- show a cell without change it to clicked cell*/
function showCell(i, j) {
    var selector = '.cell-' + i + "-" + j;
    var elCell = document.querySelector(selector);
    elCell.innerText = gBoard[i][j].element;
}

/* Function Description: hide a cell, after some sces the hint show it need to desapir*/
function hideCell(selector) {
    var elCell = document.querySelector(selector);
    elCell.innerText = '';
}

/* Function Description: hide the cells that we open for put mines in manually status*/
function hideCells() {
    for (var i = 0; i < gGame.mines.length; i++) {
        var selector = '.cell-' + gGame.mines[i].i + "-" + gGame.mines[i].j;
        hideCell(selector);
    }
    updateNegs();
}

/* Function Description: open a cell and change it to clicked cell, add relevant class*/
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
}


/* Function Description: return all the locations in the board*/
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

/* Function Description: add zeros and relevant sign- it use us for the clock and nums of guess
check if the abs small than 10 or 100, the desire to always have 3 digits*/
function addZeros(num, sign) {
    var newNum = sign;
    newNum += Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
    return newNum;
}

/* Function Description: deep copy of the board- object cant copy by slice
Go through the whole board and copy each object cell at a time 
TODO: check if exits function like this in js*/
function deepCopyBoard(board) {
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
