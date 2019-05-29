class Ship
{
  constructor(x, y, width, height, controls, image, id = 0, speed = 0, direction = 0)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.id = id;
    this.speed = speed;
    this.thrust = 0.3 * speed;

    this.direction = direction;
    this.velocityX = 0;
    this.velocityY = 0;

    this.boostFactor = 15;
    this.maxVelocity = 1;
    this.turnSpeed = 0;
    this.turnThrust = 0.01;
    this.size = 5;

    this.up = controls[0];
    this.down = controls[1];
    this.left = controls[2];
    this.right = controls[3];
    this.boost = controls[4];
    this.strafeLeft = controls[5];
    this.strafeRight = controls[6];

    this.shootDelay = 0;
    this.img = img;
    this.shootTime = 20;
    this.place = 1;
  }

  draw(target)
  {
    target.push()
    target.translate(this.x, this.y);
    target.rotate(this.direction);
    target.image(this.img, 0, 0, this.width, this.height);
    target.pop();
  }

  move()
  {
    if (register[this.right]) {
        this.turnSpeed += this.turnThrust;
    }
    if (register[this.left]) {
        this.turnSpeed -= this.turnThrust;
    }
    this.turnSpeed *= 0.85;

    if (this.placeFree(this.x, this.y, this.direction + this.turnSpeed) == true) {
        this.direction += this.turnSpeed;
    } else {
        this.turnSpeed = 0;
    }

    if (register[this.up]) {
        this.velocityX += this.thrust * cos(this.direction);
        this.velocityY += this.thrust * sin(this.direction);
    }
    if (register[this.down]) {
        this.velocityX -= this.thrust * cos(this.direction) / 2;
        this.velocityY -= this.thrust * sin(this.direction) / 2;
    }
    if (register[this.boost]) {
        this.velocityX += this.thrust * cos(this.direction) * this.boostFactor;
        this.velocityY += this.thrust * sin(this.direction) * this.boostFactor;
        register[this.boost] = false;
    }
    if (register[this.strafeLeft]) {
        this.velocityX += this.thrust * cos(this.direction - PI / 2) * this.boostFactor;
        this.velocityY += this.thrust * sin(this.direction - PI / 2) * this.boostFactor;
        register[this.strafeLeft] = false;
    }
    if (register[this.strafeRight]) {
        this.velocityX += this.thrust * cos(this.direction + PI / 2) * this.boostFactor;
        this.velocityY += this.thrust * sin(this.direction + PI / 2) * this.boostFactor;
        register[this.strafeRight] = false;
    }

    this.velocityX *= 0.95;
    this.velocityY *= 0.95;
    if (this.placeFree(this.x + this.velocityX, this.y+this.velocityY, this.direction)== true) {
        this.x += this.velocityX;
        this.y += this.velocityY;
    } else {
        let o = this.placeFree(this.x + this.velocityX, this.y+this.velocityY, this.direction)
        this.velocityX = (this.x-o.x)/abs(this.x-o.x)*abs(this.velocityX)/5;
        this.velocityY = (this.y-o.y)/abs(this.y-o.y)*abs(this.velocityY)/5;
    }

    for (var c of checkpoints) {
        if (rotatedRectangularCollision(this, c)) {
            if(!c.players[this.id]){
                c.players[this.id] = true;
                this.nextCheckpoint++;
            }

        }
    }

    if (rotatedRectangularCollision(this, finish)) {
        for (var c of checkpoints) {
            if (!c.players[this.id]) {
                return;
            }
            c.players[this.id] = false;
        }
        this.lap++;
        console.log(this.lap);
    }
  }

  shoot()
  {
    if (register[this.shootButton]) {
        //register[this.shootButton]=false;
        if (this.shootDelay <= 0) {
            projectiles.push(new Projectile(this.x, this.y, cos(this.direction) * 15 * this.thrust + this.velocityX, sin(this.direction) * 15 * this.thrust + this.velocityY));
            this.shootDelay = this.shootTime;
        }
    }
    this.shootDelay--;
  }

  update(c)
  {
    this.move();
    this.draw(c);
    this.shoot();
  }

  checkFree(x, y, direction)
  {
    var temp = { x: x, y: y, direction: direction, width: this.width, height: this.height }
    for (var o of obstacles) {
        if (rotatedRectangularCollision(temp, o)) {
            return o;
        }
    }
    return true;
  }
}
