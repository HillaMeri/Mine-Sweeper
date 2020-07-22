

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

function openNegs(board, pos) {
    var negs = [];
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j].isMine === false && !board[i][j].isMarked && !board[i][j].isShown) {
                var selector = '.cell-' + i + "-" + j;
                var elCell = document.querySelector(selector);
                cellChange(i, j, elCell)
            }
        }
    }
}

function openNegsWithBooms(board, pos) {
    var negs = [];
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (!board[i][j].isMarked && !board[i][j].isShown) {
                var selector = '.cell-' + i + "-" + j;
                var elCell = document.querySelector(selector);
                elCell.innerText = gBoard[i][j].element;
                negs.push({i:i,j:j});
            }
        }
    }
    return negs;
}

function cellChange(i, j, elCell) {
    if (gBoard[i][j].isShown) return;
    elCell.innerText = gBoard[i][j].element;
    gBoard[i][j].isShown = true;
    elCell.classList.add('clicked-Cell');
    gGame.shownCount++;
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
            spaces.push(coord);
        }
    }
    return spaces;
}

function addZeros(num, sign) {
    var newNum = sign;
    newNum += Math.abs(num) < 10 ? '0' + Math.abs(num) : Math.abs(num);
    return newNum;
}

// function addMinus(num) {
//     var newNum = '-';
//     if (num < -10) newNum += '00';
//     else if (num < -100) newNum += '00';
//         newNum += num;
//     return newNum;
// }


// ########random number################
// function getRandomInteger(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// ########random color################
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }

// ########negs table################
// function countNgs(board, pos) {
//     var count = 0;
//     for (var i = pos.i-1; i <= pos.i+1; i++) {
//         for (var j = pos.j-1; j <= pos.j+1; j++) {
//             if (i === pos.i && j === pos.j) continue;
//             if (!checkIfInBoard(board, {i:i,j:j})) continue;
//             if (board[i][j] !== EMPTY_CELL) count++;
//         }
//     }
//     return count;
// }

// function checkIfInBoard(board, pos) {
//     return (pos.i >= 0 && pos.i < board.length &&
//             pos.j >= 0 && pos.j < board[pos.i].length);
// }


// ########create mat################
// function createMat(cols,rows,range) {
//     var mat = []
//     for (var i = 0; i < cols; i++) {
//         mat[i] = [];
//         for (var j = 0; j < rows; j++) {
//             mat[i][j] = getRandomInteger(0,range);
//         }
//     }
//     return mat;
// }


// ########suffle array################
// function shuffle(nums) {
//     for (var i = 0; i < nums.length; i++) {
//         var temp = nums[i];
//         var randIdx = getRandomInteger(0, nums.length - 1);
//         nums[i] = nums[randIdx];
//         nums[randIdx] = temp;
//     }
// }



// ########render Board################

// function renderBoard() {
//     var htmlStr = '';
//     var sizeBoard = Math.sqrt(gChoosenLevel);
//     for (var i = 0; i < sizeBoard; i++) {
//         htmlStr += '<tr>';
//         for (var j = 0; j < sizeBoard; j++) {
//             var numCell = gNums.pop();
//             var className = 'cell-' + numCell;
//             htmlStr += '<td class="cell ' + className + '" onclick = "cellClicked(this)" data-id="' + numCell + '">' + numCell + '</td>';
//         }
//         htmlStr += '</tr>';
//     }
//     var elBoard = document.querySelector('.board');
//     elBoard.innerHTML = htmlStr;
// }

// ########render cell################
// function renderCell(location, value) {
//   var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//   elCell.innerHTML = value;
// }


// ########Audio################
// var elAudio = document.querySelector('.eat-candy');
// elAudio.play();



// ########handleKey################
// function handleKey(event) {
// 	switch (event.key) {
// 		case 'ArrowLeft':
// 			j = j - 1;
// 			break;
// 		case 'ArrowRight':
// 			j = j + 1;
// 			break;
// 		case 'ArrowUp':
// 			i = i - 1;
// 			break;
// 		case 'ArrowDown':
// 			i = i + 1;
// 			break;
// 	}
// 	moveTo(i, j);
// }



// ########getEmptySpace################
// function getEmptySpace() {
//     var empties = [];
//     for (var i = 0; i < gBoard.length - 1; i++) {
//         for (var j = 0; j < gBoard[i].length - 1; j++) {
//             var cell = gBoard[i][j];
//             if (cell.type === EMPTY) {
//                 var coord = { i: i, j: j };
//                 empties.push(coord);
//             }
//         }
//     }
//     if(!empties.length) return -1;
//     var coord = empties[getRandomIntInclusive(0, empties.length - 1)];
//     return coord;
//   }