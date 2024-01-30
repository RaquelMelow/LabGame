class Game {
  constructor(canvasId, level) {
    this.canvas = document.getElementById(canvasId);
    this.canvas.height = CANVAS_H;
    this.canvas.width = CANVAS_W;
    this.canvas.parentElement.classList.add("level1");

    this.collisionMargin = COLLISION_MARGIN;
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = null;
    this.fps = FPS;

    this.totalScore = 0;

    this.score = new Score(this.ctx, 10, 10);
    this.ball = new Ball(this.ctx, 600, 550, "black", 10, "assets/img/ball.png");
    this.hole = new Hole(this.ctx, 550, 200, "red", 15, "assets/img/hole.png");
    this.level = level;
    this.obstacles = [];

    this.transitionImage = new TransitionImage(this.ctx, this.canvas, "assets/img/transition_image.png", 5000);
    this.finishImage = new FinishImage(this.ctx, this.canvas, "assets/img/finish.png");
    this.totalScoreImage = new TotalScoreImage(this.ctx, this.canvas, "assets/img/totalScore.png")

    this.backgroundMusic = new Audio("assets/audio/music.mp3");
    this.startMusic = new Audio("assets/audio/game-start.mp3");
    this.holeCollisionSound = new Audio("assets/audio/collision.mp3");


  }

  changeLevel() {
    this.obstacles = [];
    switch (this.level) {
      case 1:
        this.score = new Score(this.ctx, 10, 10);

        this.obstacles.push(new Obstacles(this.ctx, this.canvas.width, 50, 450, 65, MARGIN, "assets/img/valla.png"));
        this.obstacles.push(new ObstacleSquare(this.ctx, this.canvas.width, 115, 325, 60, MARGIN));
        this.obstacles.push(new ObstacleSmall(this.ctx, 740, 250, 210, 70, "assets/img/arbustorosa.png"));
        this.obstacles.push(new Obstacles(this.ctx, this.canvas.width, 440, 450, 65, MARGIN, "assets/img/valla.png"));

        this.canvas.parentElement.classList.remove("level2");
        this.canvas.parentElement.classList.add("level1");
        break;

      case 2:
        this.score = new Score(this.ctx, 10, 10);

        this.obstacles = [];

        this.obstacles.push(new ObstacleCar(this.ctx, this.canvas.width, 400, 500, 280, "assets/img/car.png"));
        this.obstacles.push(new ObstacleGreenCar(this.ctx, this.canvas.width, 100, 500, 180, "assets/img/greencar.png"));
        this.obstacles.push(new ObstacleBus(this.ctx, this.canvas.width, 240, 150, 700, "assets/img/bus.png"));

        this.canvas.parentElement.classList.add("level2");
        this.ball = new Ball(this.ctx, 600, 550, "black", 10, "assets/img/ball.png");
        this.hole = new Hole(this.ctx, 350, 120, "red", 15, "assets/img/hole.png");

        this.canvas.parentElement.classList.remove("level1");


        break;

      case 3:
        this.score = new Score(this.ctx, 10, 10);

        this.obstacles = [];

        this.obstacles.push(new ObstacleSunrise(this.ctx, 0, 100, 800, 65));
        this.obstacles.push(new ObstacleShop(this.ctx, this.canvas.width, 35, 550, 80));
        this.obstacles.push(new ObstacleShop2(this.ctx, this.canvas.width, 35, 150, 80));
        this.obstacles.push(new ObstacleBusStop(this.ctx, this.canvas.width, 350, 450, 80));

        this.canvas.parentElement.classList.add("level3");
        this.hole = new Hole(this.ctx, 70, 210, "red", 15, "assets/img/hole.png");
        this.ball = new Ball(this.ctx, 600, 550, "black", 10, "assets/img/ball.png");

        this.canvas.parentElement.classList.remove("level2");
        break;

      default:
        break;

    }
    this.draw();
  }

  nextLevel() {
    this.level++;
    this.totalScore += this.ball.score;
    if (this.level === 4) {
      this.gameOver();
    } else {
      this.transitionImage.showForDisplayTime();
    }
  }
  

  start() {
    if (this.level === 1) {
      this.startMusic.play();
      this.startMusic.volume = 0.4;
    }
    this.changeLevel();

    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.draw();
        this.update();
      }, this.fps);

     
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  handleObstacleCollision(obstacle) {
    if (obstacle.collision(this.ball)) {
      const ballLeft = this.ball.x + 15;
      const ballRight = ballLeft + this.ball.width + 15;
      const ballTop = this.ball.y + 15;
      const ballBottom = ballTop + 15 + this.ball.height + 15;

      const axis = {
        up: ballRight * 2 > obstacle.x  && ballLeft < obstacle.x + obstacle.w && ballBottom <= obstacle.y +50,
        down: ballRight > obstacle.x && ballLeft < obstacle.x + obstacle.w && ballTop + 15 >= obstacle.y + obstacle.h,
        left: ballBottom > obstacle.y && ballTop < obstacle.y + obstacle.h && ballRight < obstacle.x +50,
        right: ballBottom > obstacle.y && ballTop < obstacle.y + obstacle.h && ballLeft >= obstacle.x + obstacle.w - 15

      };

      this.ball.handleCollision(axis);

    }
  }

  checkCollision() {
    this.obstacles.forEach((obstacle) => this.handleObstacleCollision(obstacle));


    if (this.hole.collision(this.ball)) {
      this.holeCollisionSound.play();
      this.stop();
      this.nextLevel();
      setTimeout(() => {
        this.start();
      }, 3000)
    }
  }

  drawTotalScore() {

    this.ctx.save();
    this.ctx.font = '72px Pixelify Sans';
    this.ctx.fillStyle = 'white'
    this.ctx.fillText("Total Score: " + this.totalScore, 170, 320);
    this.ctx.restore();

    this.totalScoreImage.draw();


  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.draw();
    this.hole.draw();
    this.score.draw();
    this.obstacles.forEach((obstacle) => obstacle.draw());

    if (this.showFinishImage) {
      this.finishImage.draw();
    }
  }

  update() {
    this.checkCollision();
    this.ball.update();
  }

  onMouseEvent(event, type) {
    this.ball.onMouseEvent(event, type, this.score);
  }

  updateBallPosition(mouseX, mouseY) {
    this.ball.updateBallPosition(mouseX, mouseY);
  }

  gameOver() {
    this.ball = new Ball(this.ctx);
    this.hole = new Hole(this.ctx);
    this.score = new Score(this.ctx);
    this.obstacles = [];
    this.canvas.parentElement.classList.add("level4");
    this.canvas.parentElement.classList.remove("level3");
    this.drawTotalScore();
    this.showFinishImage = true;
    this.start();
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
}
