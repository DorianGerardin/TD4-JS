var theme;
var game = new Game();

theme = document.getElementById("themes");
theme.onchange = function() {game.changerTheme(theme.value)};

let melanger = document.getElementById("melanger");
melanger.onclick = function() {game.melanger()};

let solution = document.getElementById("solution");
solution.onclick = function() {game.solution_puzzle()};
