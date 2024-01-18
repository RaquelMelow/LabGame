class Hole {

    constructor(ctx, x, y) {
        this.ctx = ctx; 
        this.x = x;
        this.y = y;
        this.radius = RADIO_HOLE
    }

    begin() {
        const holeX = Math.random() * (this.canvas.width - 30) + 15;
        const holeY = Math.random() * (this.canvas.height - 30) + 15;
    }
    draw() {

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.closePath();
        this.ctx.fillStyle = "red";
        this.ctx.fill();

    }
}
