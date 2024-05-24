window.onload = function () {
  const startButton = document.getElementById("start-button");
  const player1 = document.getElementById("lady-btn");
  const player2 = document.getElementById("snail-button");
  const restartButton = document.getElementById("restart-button");
  const startScreen = document.getElementById("game-intro");
  const selectPlayer = document.getElementById("select-player");
  let ourGame;
  let imgSource;
  startButton.addEventListener("click", function () {
    startScreen.style.display = "none";
    selectPlayer.style.display = "block";
  });
  player1.addEventListener("click", function () {
    imgSource = "images/ladyplayer.png";
    console.log("clickable");
    
    startGame();
  });
  player2.addEventListener("click", function () {
    imgSource = "images/snailplayer.png";
    startGame();
  });
  restartButton.addEventListener("click", () => {
    window.location.reload();
  });
  document.addEventListener("keydown", (event) => {
    console.log("a key was pressed", event);
    if (event.code === "ArrowRight") {
      //then we move our player to the right
      ourGame.player.directionX = 4;
    } else if (event.code === "ArrowLeft") {
      //then we move our player to the left
      ourGame.player.directionX = -4;
    } else if (event.code === "ArrowUp") {
      //then we move our player to the up
      ourGame.player.directionY = -4;
    } else if (event.code === "ArrowDown") {
      //then we move our player to the down
      ourGame.player.directionY = 4;
    }
  });
  document.addEventListener("keyup", () => {
    ourGame.player.directionX = 0;
    ourGame.player.directionY = 0;
  });

  function startGame() {
    console.log("start game");
    ourGame = new Game(imgSource);
    ourGame.start();
  }
};
