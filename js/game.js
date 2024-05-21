class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      50,
      50,
      600,
      550,
      "../images/ladyplayer.png"
    );
    this.height = 800;
    this.width = 700;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.score = 0;
    this.lives = 0;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }
  gameLoop() {
    this.update();
    if (this.isGameOver) {
      clearInterval(this.gameIntervalId);
      this.gameOver();
    }
  }
  update() {
    this.player.move();

    this.obstacles.forEach((oneObstacle, oneObstacleIndex) => {
      oneObstacle.move();

      const thereWasACollision = this.player.didCollide(oneObstacle);
      if (thereWasACollision) {
        this.obstacles.splice(oneObstacleIndex, 1);
        oneObstacle.element.remove();
        this.obstacles.push(new Obstacle(this.gameScreen));
        this.lives -= 1;
        if (this.lives === 0) {
          this.isGameOver = true;
        }
        const livesElement = document.getElementById("lives");
        livesElement.innerText = this.lives;
      }

      if (oneObstacle.top > 700) {
        this.obstacles.splice(oneObstacleIndex, 1);
        oneObstacle.element.remove();
        this.score += 1;
        //always update the DOM to your new score
        const scoreElement = document.getElementById("score");
        scoreElement.innerText = this.score;
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    });
  }
  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
// same class of player, give different speed and lives
