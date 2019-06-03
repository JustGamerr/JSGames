class Particle
{
  constructor(x, y, vx, vy)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = 10;
    this.color = color(150, 150, 0, 50);
    this.drag = 0.05;
    this.duration = 15;
  }

  draw(canvas)
  {
    canvas.fill(this.color);
    canvas.ellipse(this.x, this.y, this.size, this.size);
  }

  move()
  {
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= (1 - this.drag);
    this.vy *= (1 - this.drag);
    this.duration--;
  }
}

class ThrustParticle extends Particle
{
  constructor(x, y, vx, vy, thrustColor)
  {
    super(x, y, vx, vy);
    this.color = thrustColor || color(0, 150, 255, 155);
    this.drag = 0;
    this.duration = 5;
    this.size = 10;
  }
}

class BoostParticle extends Particle
{
  constructor(x, y, vx, vy)
  {
    super(x, y, vx, vy);
    this.color = color(150, 200, 255, 200);
    this.drag = 0;
    this.duration = 5;
    this.size = 25;
  }
}

class BoomParticle extends Particle
{
  constructor(x, y, vx, vy)
  {
    super(x,y,0,0);
    this.color = color(255,200,0,255);
    this.drag = 0;
    this.duration = 15;
    this.size = 25;
  }
  move()
  {
    this.size++;
    this.duration--;
  }
}
