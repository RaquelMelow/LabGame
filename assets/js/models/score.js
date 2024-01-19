class Score {

    constructor(ctx, x, y, points = 0) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = Math.ceil(512 / 10);
        this.h = Math.ceil(512 / 10);

        this.sprite = new Image ();
        this.sprite.src = "assets/img/score.png";
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
        this.points = points;
    }
    
    incrementShots() {
        this.points++;
    }

    draw () {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );

            this.ctx.save();
            this.ctx.fillStyle = 'black';
            this.ctx.font = '25px Arial';
            this.ctx.fillText(this.points, this.x + this.w + 10, this.y + Math.ceil(this.y + this.h / 2));
            this.ctx.restore();
        }
    }
}