class Game {
  constructor(imgSource) {
    this.startScreen = document.getElementById("game-intro");
    this.selectPlayer = document.getElementById("select-player");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameContainer = document.getElementById("game-container");
    this.player = new Player(this.gameScreen, 100, 100, 400, 250, imgSource);
    this.height = 600;
    this.width = 500;
    this.obstacles = [new Obstacle(this.gameScreen)];
    this.points = 0;
    this.health = 5;
    this.isGameOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = 1000 / 60;
  }

  selectPlayerScreen() {
    this.selectPlayer.style.height = `${this.height}px`;
    this.selectPlayer.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.selectPlayer.style.display = "block";
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameContainer.style.display = "block";
    this.selectPlayer.style.display = "none";
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
        this.health -= 1;
        if (this.health === 0) {
          this.isGameOver = true;
        }
        const livesElement = document.getElementById("health");
        livesElement.innerText = this.health;
      }
      if (oneObstacle.top > 700) {
        this.obstacles.splice(oneObstacleIndex, 1);
        oneObstacle.element.remove();
        this.points += 5;
        //always update the DOM to your new score
        const scoreElement = document.getElementById("points");
        scoreElement.innerText = this.points;
        this.obstacles.push(new Obstacle(this.gameScreen));
      }
    });
  }

  gameOver() {
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
