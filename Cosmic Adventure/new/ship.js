class Ship
{
  constructor(x, y, w, h, controls, img, id = 1, speed = 1, direction = 0, health)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;

    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.thrust = 0.3 * speed;
    this.boostFactor = 15;
    this.maxV = 1;
    this.turnSpeed = 0;
    this.turnThrust = 0.01;

    this.mass = 5;
    this.id = id;

    this.up = controls[0];
    this.down = controls[1];
    this.left = controls[2];
    this.right = controls[3];
    this.boost = controls[4];
    this.strafeLeft = controls[5];
    this.strafeRight = controls[6];
    this.shootButton = controls[7];

    this.shootDelay = 0;
    this.img = img;
    this.shootTime = 20;
    this.place = 1;

    this.health = health;
  }

  draw(target)
  {
      target.push()
      target.translate(this.x, this.y);
      target.rotate(this.direction);
      target.image(this.img, 0, 0, this.w, this.h);
      target.pop();

  }

  move() {
    if (register[this.right])
    {
      this.turnSpeed += this.turnThrust;
    }
    if (register[this.left])
    {
      this.turnSpeed -= this.turnThrust;
    }
    this.turnSpeed *= 0.85;

    if (this.placeFree(this.x, this.y, this.direction + this.turnSpeed) == true)
    {
      this.direction += this.turnSpeed;
    } else {
      this.turnSpeed = 0;
    }

    if (register[this.up])
    {
      this.vx += this.thrust * cos(this.direction);
      this.vy += this.thrust * sin(this.direction);
      particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / 2, -this.vy / 2));
    }
    if (register[this.down])
    {
      this.vx -= this.thrust * cos(this.direction) / 2;
      this.vy -= this.thrust * sin(this.direction) / 2;
      particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, this.vx * 1.5, this.vy * 1.5));
    }
    if (register[this.boost])
     {
      this.vx += this.thrust * cos(this.direction) * this.boostFactor;
      this.vy += this.thrust * sin(this.direction) * this.boostFactor;
      for (var i = 1; i < 20; i += 4)
      {
          particles.push(new BoostParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / i, -this.vy / i));
      }
      register[this.boost] = false;
    }
    if (register[this.strafeLeft])
    {
      this.vx += this.thrust * cos(this.direction - PI / 2) * this.boostFactor;
      this.vy += this.thrust * sin(this.direction - PI / 2) * this.boostFactor;
      for (var i = 1; i < 20; i += 4)
      {
          particles.push(new BoostParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / i, -this.vy / i));
      }
      register[this.strafeLeft] = false;
    }
    if (register[this.strafeRight])
    {
      this.vx += this.thrust * cos(this.direction + PI / 2) * this.boostFactor;
      this.vy += this.thrust * sin(this.direction + PI / 2) * this.boostFactor;
      for (var i = 1; i < 20; i += 4)
      {
          particles.push(new BoostParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / i, -this.vy / i));
      }
      register[this.strafeRight] = false;
    }

    this.vx *= 0.95;
    this.vy *= 0.95;
    if (this.placeFree(this.x + this.vx, this.y + this.vy, this.direction)== true)
    {
      this.x += this.vx;
      this.y += this.vy;
    } else {
      let o = this.placeFree(this.x + this.vx, this.y + this.vy, this.direction)
      this.vx = (this.x-o.x)/abs(this.x-o.x)*abs(this.vx)/5;
      this.vy = (this.y-o.y)/abs(this.y-o.y)*abs(this.vy)/5;
    }
  }

  shoot() {
    if (register[this.shootButton]) {
      if (this.shootDelay <= 0) {
          projectiles.push(new Projectile(this.x, this.y, cos(this.direction) * 15 * this.thrust + this.vx, sin(this.direction) * 15 * this.thrust + this.vy));
          this.shootDelay = this.shootTime;
      }
    }
    this.shootDelay--;
  }

  update(canvas) {
    this.move();
    this.draw(canvas);
    this.shoot();
  }

  placeFree(x, y, direction) {
    var temp = { x: x, y: y, direction: direction, w: this.w, h: this.h }
    for (var o of obstacles) {
        if (rotatedRectangularCollision(temp, o)) {
            return o;
        }
    }
    return true;
  }
}
