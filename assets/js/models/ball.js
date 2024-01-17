class Ball {
    constructor(ctx, x, y, color,  radius) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = radius;
      
      this.isMouseDown = false;
  
      this.vx = VELOCITY_BALL;
      this.vy = VELOCITY_BALL;
      this.speed = 5;
      
      this.bounces = 0;
      
    
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

  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }

    update() {
      if (!this.isMouseDown) {
        const canvasW = this.ctx.canvas.width;
        const canvasH = this.ctx.canvas.height;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + this.radius > canvasW) {
          this.x = canvasW - this.radius;
          this.vx *= -1;
          this.bounces++;
          this.vx *= 1 - (this.bounces * 0.1); 
        } 
        if (this.x - this.radius < 0) {
          this.x = this.radius;
          this.vx *= -1;
          this.bounces++;
          this.vx *= 1 - (this.bounces * 0.1);
        }
        if (this.y + this.radius > canvasH) {
          this.y = canvasH - this.radius;
          this.vy *= -1;
          this.bounces++;
          this.vy *= 1 - (this.bounces * 0.1);
        }
        if (this.y - this.radius < 0) {
          this.y = this.radius;
          this.vy *= -1;
          this.bounces++;
          this.vy *= 1 - (this.bounces * 0.1);
        }
  
        if (Math.abs(this.vx) < 0.1) {
          this.vx = 0;
        }
        if (Math.abs(this.vy) < 0.1) {
          this.vy = 0;
        }
      }
    }
  }
