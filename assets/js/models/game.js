class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.height = CANVAS_H;
        this.canvas.width = CANVAS_W;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = null;
        this.fps = FPS

        

        this.ball = new Ball(this.ctx, 100, 100, 'black', 10);
    }

    start () {
        if(!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.draw();
            }, this.fps);
            
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.draw();
    }

    update() {
        this.ball.update();
      }

    onMouseEvent (event, type) {
        this.ball.onMouseEvent(event, type);
    }

    updateBallPosition(mouseX, mouseY) {
        this.ball.updateBallPosition(mouseX, mouseY);
    }
}