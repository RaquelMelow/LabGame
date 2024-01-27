class ObstacleShop {

    constructor(ctx, canvasWidth, y, w, h) {
        this.ctx = ctx;
        this.x = canvasWidth - w - MARGIN;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.sprite = new Image();
        this.sprite.src = "assets/img/shop.png";
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.w = Math.ceil(this.sprite.width);
            this.h = Math.ceil(this.sprite.height);
        };
    }
        draw() {
        if (this.sprite.isReady) {
            this.ctx.globalCompositeOperation = 'destination-out';

            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            this.ctx.globalCompositeOperation = 'source-over';

           this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
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