class Ship
{
    constructor(x, y, w, h, controls, img, id = 1, spd = 1, dir = 0)
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.dir = dir;
        this.vx = 0;
        this.vy = 0;
        this.spd = spd;
        this.thrust = 0.3 * spd;
        this.boostFactor = 15;
        this.maxV = 1;
        this.turnSpeed = 0
        this.turnThrust = 0.01;
        this.mass = 5;
        this.id = id;
        this.lap = 0;
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
    }

    draw(target)
    {
        target.push()
        target.translate(this.x, this.y);
        target.rotate(this.dir);
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

        if (this.placeFree(this.x, this.y, this.dir + this.turnSpeed) == true)
        {
            this.dir += this.turnSpeed;
        } else {
            this.turnSpeed = 0;
        }

        if (register[this.up])
        {
            this.vx += this.thrust * cos(this.dir);
            this.vy += this.thrust * sin(this.dir);
            particles.push(new ThrustParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, -this.vx / 2, -this.vy / 2));
        }
        if (register[this.down])
        {
            this.vx -= this.thrust * cos(this.dir) / 2;
            this.vy -= this.thrust * sin(this.dir) / 2;
            particles.push(new ThrustParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, this.vx * 1.5, this.vy * 1.5));
        }
        if (register[this.boost])
         {
            this.vx += this.thrust * cos(this.dir) * this.boostFactor;
            this.vy += this.thrust * sin(this.dir) * this.boostFactor;
            for (var i = 1; i < 20; i += 4)
            {
                particles.push(new BoostParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, -this.vx / i, -this.vy / i));
            }
            register[this.boost] = false;
        }
        if (register[this.strafeLeft])
        {
            this.vx += this.thrust * cos(this.dir - PI / 2) * this.boostFactor;
            this.vy += this.thrust * sin(this.dir - PI / 2) * this.boostFactor;
            for (var i = 1; i < 20; i += 4)
            {
                particles.push(new BoostParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, -this.vx / i, -this.vy / i));
            }
            register[this.strafeLeft] = false;
        }
        if (register[this.strafeRight])
        {
            this.vx += this.thrust * cos(this.dir + PI / 2) * this.boostFactor;
            this.vy += this.thrust * sin(this.dir + PI / 2) * this.boostFactor;
            for (var i = 1; i < 20; i += 4)
            {
                particles.push(new BoostParticle(this.x - cos(this.dir) * this.w * 0.3, this.y - sin(this.dir) * this.h * 0.3, -this.vx / i, -this.vy / i));
            }
            register[this.strafeRight] = false;
        }

        this.vx *= 0.95;
        this.vy *= 0.95;
        if (this.placeFree(this.x + this.vx, this.y + this.vy, this.dir)== true)
        {
            this.x += this.vx;
            this.y += this.vy;
        } else {
            let o = this.placeFree(this.x + this.vx, this.y + this.vy, this.dir)
            this.vx = (this.x-o.x)/abs(this.x-o.x)*abs(this.vx)/5;
            this.vy = (this.y-o.y)/abs(this.y-o.y)*abs(this.vy)/5;
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

    shoot() {
        if (register[this.shootButton]) {
            //register[this.shootButton]=false;
            if (this.shootDelay <= 0) {
                projectiles.push(new Projectile(this.x, this.y, cos(this.dir) * 15 * this.thrust + this.vx, sin(this.dir) * 15 * this.thrust + this.vy));
                this.shootDelay = this.shootTime;
            }
        }
        this.shootDelay--;
    }

    update(c) {
        this.move();
        this.draw(c);
        this.shoot();
    }

    placeFree(x, y, dir) {
        var temp = { x: x, y: y, dir: dir, w: this.w, h: this.h }
        for (var o of obstacles) {
            if (rotatedRectangularCollision(temp, o)) {
                return o;
            }
        }
        return true;
    }
}
