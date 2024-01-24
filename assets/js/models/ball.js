class Ball {
  constructor(ctx, x, y, color, w, h) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = w;
    this.height = h;

    
    this.isMouseDown = false;
    this.isMoving = false;

    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.minVelocity = MIN_VELOCITY; 

    this.reductionFactor = REDUCTION_FACTOR;

    this.bounces = 0;
    this.lastShootTime = 0;

    this.sprite = new Image();
    this.sprite.src = "assets/img/ball.png";
    this.sprite.isReady = false;
    this.sprite.onload = () => {
      this.sprite.isReady = true;

      this.width = Math.ceil(this.sprite.width / 20);
      this.height = Math.ceil(this.sprite.height / 20);
    };
  }

  onMouseEvent(event, type, score) {
    switch (type) {
      case 'down':
        this.handleMouseDown();
        break;
      case 'up':
        this.handleMouseUp(score);
        break;
      case 'move':
        this.handleMouseMove(event.clientX, event.clientY);
        break;
    }
  }

  handleMouseDown() {
    if (!this.isMoving) {
      this.isMouseDown = true;
    }
  }

  handleMouseUp(score) {
    if (this.isMouseDown) {
          // Calcula el ángulo entre la posición del objeto y la posición del mouse
      const angle = Math.atan2(this.mouseY - this.y, this.mouseX - this.x);
          // Calcula las componentes de velocidad en x e y basadas en el ángulo y la velocidad predeterminada
      this.vx = -Math.cos(angle) * this.speed;
      this.vy = -Math.sin(angle) * this.speed;

      
      this.isMouseDown = false;
      this.isMoving = true;
      this.lastShootTime = Date.now();

      score.incrementShots();
    }
  }

  handleMouseMove(mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  draw() {
    this.ctx.globalCompositeOperation = 'destination-out';

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.globalCompositeOperation = 'source-over';

    if (this.sprite.isReady) {
      this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
  }

  update() {
    if (!this.isMouseDown && this.isMoving) {
      const canvasW = this.ctx.canvas.width;
      const canvasH = this.ctx.canvas.height;

      this.x += this.vx;
      this.y += this.vy;

      if (this.x + this.width / 2 > canvasW) {
        this.x = canvasW - this.width / 2;
        this.vx *= -1;
        this.bounces++;
      } else if (this.x - this.width / 2 < 0) {
        this.x = this.width / 2;
        this.vx *= -1;
        this.bounces++;
      }

      if (this.y + this.height / 2 > canvasH) {
        this.y = canvasH - this.height / 2;
        this.vy *= -1;
        this.bounces++;
      } else if (this.y - this.height / 2 < 0) {
        this.y = this.height / 2;
        this.vy *= -1;
        this.bounces++;
      }

      this.vx *= 1 - this.reductionFactor;
      this.vy *= 1 - this.reductionFactor;

      if (Math.abs(this.vx) < this.minVelocity && Math.abs(this.vy) < this.minVelocity) {
        this.vx = 0;
        this.vy = 0;
        this.isMoving = false;
      }
    }
  }

  handleCollision(axis) {
    if (axis === 'x') {
      this.vx = -this.vx;
    } else {
      this.vy = -this.vy;
    }
  }
}