var theme;

var game = new Game();

game.melanger();

theme = document.getElementById("themes");
theme.onchange = function() {game.changerTheme(theme.value)};

let melanger = document.getElementById("melanger");
melanger.onclick = function() {game.melanger()};

let solution = document.getElementById("solution");
solution.onclick = function() {game.solution_puzzle()};

for (let i = 0; i < game.listeCases.length; i++) {
    game.listeCases[i].img.addEventListener('click', game.bougerCase_maj);
}


