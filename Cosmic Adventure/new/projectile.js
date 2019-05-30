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
        this.dir = 0;
        this.w = this.size;
        this.h = this.size;
        this.mass = 5;
    }
    draw(c)
    {
        c.fill(this.color);
        c.ellipse(this.x, this.y, this.size, this.size);
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
                    this.collided = true;
                    momentum(this, t);
                    particles.push(new BoomParticle(this.x, this.y,0,0))
                }
            }
        }
    }

    update(c)
    {
        this.draw(c);
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
