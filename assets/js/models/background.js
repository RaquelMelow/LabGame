class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.sprite = new Image();
        this.sprite.src = "assets/img/background.jpg";

        this.sprite.onload = () => {
            this.sprite.isReady = true;

            this.width = Math.ceil(this.sprite.width / 20);
            this.height = Math.ceil(this.sprite.height / 20);
        };
    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
        }
    }
}