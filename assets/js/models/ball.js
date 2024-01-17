class Ball {
    constructor(ctx, x, y, color,  radius) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = radius;
      this.isMouseDown = false;
  
      this.vx = 0;
      this.vy = 0;
      this.speed = 5;
        
    }

    onMouseEvent(event, type) {
      switch (type) {
        case 'down':
          this.handleMouseDown();
          break;
        case 'up':
          this.handleMouseUp();
          break;
        case 'move':
          this.handleMouseMove(event.clientX, event.clientY);
          break;
      }
    }
  
    handleMouseDown() {
      this.isMouseDown = true;
    }
  
    handleMouseUp() {
      if (this.isMouseDown) {
        const angle = Math.atan2(this.y - this.mouseY, this.x - this.mouseX);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.isMouseDown = false;
      }
    }
  
    handleMouseMove(mouseX, mouseY) {
      this.mouseX = mouseX;
      this.mouseY = mouseY;
    }
  
    update() {
      if (!this.isMouseDown) {
        this.x += this.vx;
        this.y += this.vy;
      }
    }
      
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
}
