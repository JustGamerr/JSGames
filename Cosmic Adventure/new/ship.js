class Ship
{
  constructor(x, y, w, h, controls, img, id = 1, speed = 1, direction = 0, health, shipNum)
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
    this.lap = 0;
    this.shipNum = shipNum;

    this.up = controls[0];
    this.down = controls[1];
    this.left = controls[2];
    this.right = controls[3];
    this.boost = controls[4];
    this.strafeLeft = controls[5];
    this.strafeRight = controls[6];
    this.shootButton = controls[7];

    this.faults = 0;
    this.shootDelay = 0;
    this.img = img;
    this.shootTime = 20;
    this.place = 1;
    this.nextCheckpoint = 0;

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
      if(this.shipNum == 2) {
        particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / 2, -this.vy / 2), color(255, 0, 0, 155));

      } else {
        particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / 2, -this.vy / 2, color(0, 150, 255, 155)));
      }
    }
    if (register[this.down])
    {
      this.vx -= this.thrust * cos(this.direction) / 2;
      this.vy -= this.thrust * sin(this.direction) / 2;
      if(this.shipNum == 2) {
        particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / 2, -this.vy / 2), color(255, 0, 0, 155));
      } else {
        particles.push(new ThrustParticle(this.x - cos(this.direction) * this.w * 0.3, this.y - sin(this.direction) * this.h * 0.3, -this.vx / 2, -this.vy / 2, color(0, 150, 255, 155)));
      }
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
        projectiles.push(new Projectile(this.x, this.y, cos(this.direction) * 15 * this.thrust + this.vx, sin(this.direction) * 15 * this.thrust + this.vy), this.id);
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

class AIShip extends Ship {
  constructor(x, y, w, h, img, id = 1, spd = 1, dir = 0)
  {
    super(x, y, w, h, [null], img, id, spd, dir)
    this.turnLeft = false;
    this.turnRight = false;
    this.forward = true;
    this.backward = false;
    this.turnTimer = 0;
    this.nextCheckpoint = 0;
    this.target;
  }
  move()
  {
    this.turnTimer -= 1;
    if (this.turnTimer < 0)
    {
      this.turnRight = false;
      this.turnLeft = false;
      this.backward = false;
      this.forward = true;
    }
    if (this.turnRight)
    {
      this.turnSpeed += this.turnThrust;
    }
    if (this.turnLeft)
    {
      this.turnSpeed -= this.turnThrust;
    }
    this.turnSpeed *= 0.85;

    if (this.placeFree(this.x, this.y, this.dir + this.turnSpeed)==true)
    {
      this.dir += this.turnSpeed;
    } else {
      this.turnSpeed = 0;
    }

    if (this.forward)
    {
      this.vx += this.thrust * cos(this.dir);
      this.vy += this.thrust * sin(this.dir);
      particles.push(new ThrustParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, -this.vx / 2, -this.vy / 2));
    }
    if (this.backward)
    {
      this.vx -= this.thrust * cos(this.dir) / 2;
      this.vy -= this.thrust * sin(this.dir) / 2;
      particles.push(new ThrustParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, this.vx * 1.5, this.vy * 1.5));
    }


    this.vx *= 0.95;
    this.vy *= 0.95;

    if(this.placeFree(this.x + this.vx*30, this.y +this.vy*30, this.dir) !== true)
    {
      this.target = checkpoints[this.nextCheckpoint]

      let dAngle = atan2(this.target.y - this.y, this.target.x - this.x)
        if (dAngle < 0)
        {
          dAngle += 2 * PI
        }
        if(this.dir<0)
        {
          this.dir+= 2*PI;
        }
        this.dir = this.dir%(2*PI);
        if (this.dir > dAngle)
        {
            if (this.dir - dAngle > PI)
            {
              this.turnRight = true;
            } else {
              this.turnLeft = true;
            }
        } else {
            if (dAngle - this.dir > PI)
            {
              this.turnLeft = true;
            } else {
              this.turnRight = true;
            }
        }
        this.turnTimer = 3;
    }


    if (this.placeFree(this.x + this.vx, this.y+this.vy, this.dir)== true)
    {
      this.x += this.vx;
      this.y += this.vy;
    } else {
      let o = this.placeFree(this.x + this.vx, this.y+this.vy, this.dir)
      this.vx = (this.x-o.x)/abs(this.x-o.x)*abs(this.vx)/5;
      this.vy = (this.y-o.y)/abs(this.y-o.y)*abs(this.vy)/5;
      if (this.forward)
      {
        this.forward = false;
        this.backward = true;

        //turn towards next checkpoint
        this.target = checkpoints[this.nextCheckpoint]

        let dAngle = atan2(this.target.y - this.y, this.target.x - this.x)
        if (dAngle < 0)
        {
          dAngle += 2 * PI
        }
        if(this.dir<0)
        {
          this.dir+= 2*PI;
        }
        this.dir = this.dir%(2*PI);
        if (this.dir > dAngle)
        {
          if (this.dir - dAngle > PI)
          {
            this.turnRight = true;
          } else {
            this.turnLeft = true;
          }
        } else {
          if (dAngle - this.dir > PI)
          {
            this.turnLeft = true;
          } else {
            this.turnRight = true;
          }
        }
        this.turnTimer = random(38,56)/(this.spd+1);
      } else {
        this.forward = true;
        this.backward = false;
      }
    }

    for (var c of checkpoints)
    {
      if (rotatedRectangularCollision(this, c))
      {
        c.players[this.id] = true;
        if(c==checkpoints[this.nextCheckpoint])
        {
            this.nextCheckpoint++;
          if(this.nextCheckpoint == checkpoints.length)
          {
              this.nextCheckpoint=0;
          }
        }
      }
    }

    if (rotatedRectangularCollision(this, finish))
    {
      for (var c of checkpoints)
      {
        if (!c.players[this.id])
        {
          return;
        }
        c.players[this.id] = false;
      }
      this.lap++;
      console.log(this.lap);
    }
  }
}
