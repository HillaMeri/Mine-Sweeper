var gHintCell;
var gHintCount;
var gHint;

// var gIntervalHint;
function hintClicked(elImg) {
    if (!gGame.isOn) return;
    if (elImg.src === "http://127.0.0.1:5500/img/1.png") return;
    gHint = true;
    elImg.src = "img/1.png";
    elImg.classList.add("hint-clicked");

}

function hintShow(i, j) {
    var cell = { i: i, j: j };
    var negs = openNegsWithBooms(gBoard, cell);
    console.log('negs,', negs);
    gHint = false;
    setTimeout(() => {
        hintHide(negs);
    }, 1000);
}

function hintHide(negs) {
    for (var i = 0; i < negs.length; i++) {
        var selector = '.cell-' + negs[i].i + "-" + negs[i].j;
        var elCell = document.querySelector(selector);
        elCell.innerText = '';
    }
}

function randerHints() {
    gHint = false;
    var elHints = document.querySelector('.hints');
    elHints.innerHTML = `<img src="img/2.png" onclick="hintClicked(this)"
     /><img src="img/2.png" onclick="hintClicked(this)" />
    <img src="img/2.png" onclick="hintClicked(this)" />`
}