class Checkpoint extends Obstacle
{
    constructor(x, y, w, h)
    {
        super(x, y, w, h);
        this.players = [];
    }

    draw(c){
        c.push()
            c.translate(this.x, this.y);
            c.rotate(this.direction);
            c.fill(200, 0, 0, 100);
            c.rect(0, 0, this.w, this.h);
            c.ellipse(0, 0, 10, 10);
        c.pop();
    }
}

class FinishLine extends Checkpoint
{
    constructor(x, y, w, h)
    {
        super(x, y, w, h);
    }
}
