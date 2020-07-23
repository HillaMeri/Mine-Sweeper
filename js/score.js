var gMyStorage;


function saveScore(level, score) {
    if (typeof (Storage) !== "undefined") {
        if (localStorage.getItem(level) === null || score < localStorage.getItem(level)) {
            localStorage.setItem(level, score);
            renderScore(level);
        }
    }
}

function renderScore(level) {
    if (localStorage.getItem(level) !== null)
        document.getElementById("score " + level).querySelector('span').innerText = localStorage.getItem(level);
}

function renderScoreToAllLevels() {
    renderScore("Easy");
    renderScore("Hard");
    renderScore("Extrenel");
}

function clearScore() {
    localStorage.clear();
    document.getElementById("score Easy").querySelector('span').innerText = '';
    document.getElementById("score Hard").querySelector('span').innerText = '';
    document.getElementById("score Extrenel").querySelector('span').innerText = '';

}
