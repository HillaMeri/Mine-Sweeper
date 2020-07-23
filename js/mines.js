
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
