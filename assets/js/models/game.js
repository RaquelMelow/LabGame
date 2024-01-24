class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.height = CANVAS_H;
        this.canvas.width = CANVAS_W;
        
        this.collisionMargin = COLLISION_MARGIN;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = null;
        this.fps = FPS;
        
        this.background = new Background(this.ctx);
        this.score = new Score(this.ctx, 10, 10);
        this.ball = new Ball(this.ctx,  600, 550, 'black', 10, 'assets/img/ball.png');
        this.hole = new Hole(this.ctx, 550, 200, 'red', 15, 'assets/img/hole.png');
        this.level = 1;
        this.obstacles = [];
    }

    levelUp() {
        this.obstacles = []
        switch(this.level) {
            case 1:
                this.obstacles.push(new Obstacles(this.ctx, this.canvas.width, 50, 450, 65, MARGIN, 'assets/img/valla.png'));
                this.obstacles.push(new ObstacleSquare(this.ctx, this.canvas.width, 115, 325, 60, MARGIN));
                this.obstacles.push(new ObstacleSmall(this.ctx, 450, 250, 210, 70, MARGIN, 'assets/img/arbustorosa.png'));
                this.obstacles.push(new Obstacles2(this.ctx, this.canvas.width, 440, 450, 65, MARGIN));
                break;
            default:
                break;
        }
    }

    start () {
        this.levelUp();
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
    handleObstacleCollision(obstacle) {
        if (obstacle.collision(this.ball)) {
            const axis = this.ball.x > obstacle.x && this.ball.x < obstacle.x + obstacle.w ? 'y' : 'x'
            
            this.ball.handleCollision(axis);
        }
    }
    checkCollision() {
        this.obstacles.forEach(obstacle =>this.handleObstacleCollision(obstacle));


    
        if(this.hole.collision(this.ball)) {
            this.gameOver();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ball.draw();
        this.hole.draw();
        this.score.draw();
        this.obstacles.forEach(obstacle => obstacle.draw())
        
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
        this.stop();
    }
}