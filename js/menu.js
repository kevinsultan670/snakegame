function startGame() {
  const level = document.getElementById("level").value;
  initGame(level);
  showMenu("gameArea");
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}

function continueGame() {
  if (!gameInterval) {
    gameInterval = setInterval(gameLoop, gameSpeed);
  }
  showMenu("gameArea");
}

function openOptions() {
  showMenu("optionsMenu");
}

function backToMenu() {
  showMenu("mainMenu");
}

function showMenu(menuId) {
  document.getElementById("mainMenu").style.display = "none";
  document.getElementById("optionsMenu").style.display = "none";
  document.getElementById("gameArea").style.display = "none";
  document.getElementById(menuId).style.display = "block";
}

function restartGame() {
  const level = document.getElementById("level").value;
  initGame(level);
  clearInterval(gameInterval);
  gameInterval = setInterval(gameLoop, gameSpeed);
}
