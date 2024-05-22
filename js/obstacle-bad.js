class Obstacle {
    constructor(gameScreen) {
      this.gameScreen = gameScreen;
      this.positionsArr = [85, 300];
      this.randomIndex = Math.floor(Math.random() * this.positionsArr.length);
      this.left = this.positionsArr[this.randomIndex];
      this.top = -250;
      this.width = 60;
      this.height = 80;
      this.element = document.createElement("img");
      this.element.src = "../images/cactus.png";
      this.element.style.position = "absolute";
      this.element.style.top = `${this.top}px`;
      this.element.style.left = `${this.left}px`;
      this.element.style.height = `${this.height}px`;
      this.element.style.width = `${this.width}px`;
      this.gameScreen.appendChild(this.element);
    }
    move() {
      this.top += 3;
      this.updatePosition();
    }
    updatePosition() {
      this.element.style.top = `${this.top}px`;
    }
  }