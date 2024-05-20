class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player1 = new Player(
      this.gameScreen,
      50,
      50,
      400,
      250,
      "../images/ladyplayer.png"
    );
    this.player2 = new Player(
      this.gameScreen,
      50,
      50,
      400,
      250,
      "../images/snailplayer.png"
    );
    this.height = 600;
    this.width = 500;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.lives = 0;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
  }
}


// same class of player, give different speed and lives
