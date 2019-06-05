class Projectile
{
  constructor(x, y, vx, vy)
  {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = 15;
    this.color = color(255, 0, 0, 100);
    this.targets = [obstacles, [player2]];
    this.collided = false;
    this.direction = 0;
    this.w = this.size;
    this.h = this.size;
    this.mass = 5;
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
  }
  collide()
  {
    for (var list of this.targets)
    {
      for (var t of list) {
        if (rotatedRectangularCollision(this, t))
        {
          if(t == player2)
            player2.health -= 25;
          this.collided = true;
          momentum(this, t);
          particles.push(new BoomParticle(this.x, this.y,0,0))
        }
      }
    }
  }

  update(canvas)
  {
    this.draw(canvas);
    this.move();
    this.collide();
  }
}

function momentum(obj1, obj2)
{
    var totalMass = obj1.mass + obj2.mass;
    obj1.vx = (obj1.vx * obj1.mass + obj2.vx * obj2.mass) / totalMass;
    obj2.vx = obj1.vx;
    obj1.vy = (obj1.vy * obj1.mass + obj2.vy * obj2.mass) / totalMass;
    obj2.vy = obj1.vy;
}