
/* Function Description: to cases:
1. at the first game the sccore is null- save the score
2. score is not null take the shortest time between the reserved and the current */
function saveScore(level, score) {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem(level) === null || score < localStorage.getItem(level)) {
            localStorage.setItem(level, score);
            renderScore(level);
            breakRecored(level);
        }
    }
}

/* Function Description: if the current time is a recored, render it to the user*/
function renderScore(level) {
    if (localStorage.getItem(level) !== null)
        document.getElementById("score " + level).querySelector('span').innerText = localStorage.getItem(level) + ' secs';
}


function renderScoreToAllLevels() {
    renderScore("Easy");
    renderScore("Hard");
    renderScore("Extrenel");
}

function clearScore() {
    localStorage.removeItem("Easy");
    localStorage.removeItem("Hard");
    localStorage.removeItem("Extrenel");
    document.getElementById("score Easy").querySelector('span').innerText = '';
    document.getElementById("score Hard").querySelector('span').innerText = '';
    document.getElementById("score Extrenel").querySelector('span').innerText = '';
}

/* Function Description: if the current time is a recored, open modal
to the user */
function breakRecored(level){
    var elRecored = document.querySelector('.modal-break-recored');
    elRecored.innerText = `You broke a record for  ${level} level 🥳 ` 
    elRecored.style.display = 'block';
    setTimeout(() => {
        elRecored.style.display = 'none';
    }, 3000);

}