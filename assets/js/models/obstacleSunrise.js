class ObstacleSunrise {

    constructor(ctx, x, y, w, h) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
    }
        draw() {
       
            this.ctx.globalCompositeOperation = 'destination-out';

            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            this.ctx.globalCompositeOperation = 'source-over';

    }



    collision(ball) {
        return (
            this.x < ball.x + ball.width &&
            this.x + this.w > ball.x &&
            this.y < ball.y + ball.height &&
            this.y + this.h > ball.y
        );

    }

}