class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.height = CANVAS_H;
        this.canvas.width = CANVAS_W;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = null;
        this.fps = FPS
        
        this.score = new Score(this.ctx, 10, 10);
        this.ball = new Ball(this.ctx, 100, 100, 'black', 10, 10, 10, this.score);
        this.hole = new Hole(this.ctx, 200, 200, 'blue', 15, '/assets/img/hole.png');

    }

    start () {
        if(!this.drawIntervalId) {
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

    checkCollision() {
        const distance = Math.sqrt((this.ball.x - this.hole.x)**2 + (this.ball.y - this.hole.y)**2);
        const collisionDistance = this.ball.radius + this.hole.radius - 5;
        if (distance <= collisionDistance) {
            this.ball.disappear();
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.draw();
        this.hole.draw();
        this.score.draw();

    }

    update() {
        this.checkCollision();
        this.ball.update();
        
      }

    onMouseEvent (event, type) {
        
        this.ball.onMouseEvent(event, type);

        if (type == 'up') {
            this.score.incrementShots();
        }
        
    }

    updateBallPosition(mouseX, mouseY) {
        this.ball.updateBallPosition(mouseX, mouseY);
    }

    clear() {
        this.ctx.clearRect(this.x - 10, this.y - 10, this.w + 20, this.h + 20);
    }

}