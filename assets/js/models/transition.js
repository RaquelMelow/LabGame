class TransitionImage {
    constructor(ctx, canvas, imagePath) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.image = new Image();
        this.image.src = imagePath;
        this.loaded = false;

        this.image.onload = () => {
            this.loaded = true;
        };
    }

    draw() {
        if (this.loaded) {
            const x = (this.canvas.width - this.image.width) / 2;
            const y = (this.canvas.height - this.image.height) / 2;
            this.ctx.drawImage(this.image, x, y);
        }
    }
}
