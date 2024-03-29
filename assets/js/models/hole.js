class Hole {

    constructor(ctx, x, y) {
        this.ctx = ctx; 
        this.x = x;
        this.y = y;
      

        this.sprite = new Image();
        this.sprite.src = "assets/img/hole.png";
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.width = Math.ceil(this.sprite.width / 10);
            this.height = Math.ceil(this.sprite.height / 10);
        };
    }
    draw() {
        if (this.sprite.isReady) {
            this.ctx.globalCompositeOperation = 'destination-out';

            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.x, this.y, this.width, this.height);

            this.ctx.globalCompositeOperation = 'source-over';

            this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
    collision(ball) {
        return (
            this.x < ball.x + ball.width &&
            this.x + this.width > ball.x &&
            this.y < ball.y + ball.height &&
            this.y + this.height > ball.y
        );
    }
}