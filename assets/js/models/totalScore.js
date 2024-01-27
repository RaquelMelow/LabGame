class TotalScoreImage {
    constructor(ctx, canvas, imagePath) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.image = new Image();
      this.image.src = imagePath;
      this.loaded = false;
      this.visible = false;
  
      this.image.onload = () => {
        this.loaded = true;
        this.showForDisplayTime();
      };
    }
  
    showForDisplayTime() {
      this.visible = true;
      this.draw();
  
      setTimeout(() => {
        this.visible = false;
      }, this.displayTime);
    }
  
    draw() {
      if (this.loaded && this.visible) {
        const x = (this.canvas.width - this.image.width) / 2;
        const y = (this.canvas.height - this.image.height) / 2;
        this.ctx.drawImage(this.image, x, y);
      }
    }
  }