var gMyStorage;


function saveScore(){
    if (typeof(Storage) !== "undefined") {
        // Store
        window.localStorage.setItem("lastname", "Smith");
        // Retrieve
        document.getElementById("score").innerHTML = window.localStorage.getItem("lastname");
      } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
      }
}


function clearScore(){
    localStorage.clear();
}