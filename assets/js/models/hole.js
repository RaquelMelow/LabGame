class Hole {

    constructor(ctx, x, y) {
        this.ctx = ctx; 
        this.x = x;
        this.y = y;
        this.radius = RADIO_HOLE

        this.w = Math.ceil(1050 / 10);
        this.h = Math.ceil(559 / 10);

        this.sprite = new Image ();
        this.sprite.src = "assets/img/hole.png";
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        }
    }

    draw() {

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = "red";
        this.ctx.fill();

    }
}

