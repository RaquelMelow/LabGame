class StartScreen {
    constructor(ctx, canvas, backgroundImage) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.backgroundImage = backgroundImage;

    }
  
    draw() {
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
    const background = new Image();
    background.src = this.backgroundImage;
    this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    }
  }