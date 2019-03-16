class Fish {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.size = 15;
        this.speed = 5;
        this.hue = 10;

        this.food = 50;
        this.maxFood = 50;

        this.xvel = 0;
        this.yvel = 0;

        this.swimTiming = floor(random(120));
        this.dead = false;
    }

    mutate() {
        if (random(100) < 75) {
            return;
        }

        this.size += random(-4, 4);
        this.speed += random(-1, 1);
        this.hue += random(-5, 5);

        if (this.size < 5) {
            this.size = 5;
        }

        if (this.speed < 3) {
            this.speed = 3;
        }

        if (this.hue > 100) {
            this.hue = 0;
        }

        if (this.hue < 0) {
            this.hue = 100;
        }
    }

    reproduce() {
        let fish = new Fish(this.x, this.y);
        fish.size = this.size;
        fish.speed = this.speed;
        fish.hue = this.hue;
    }

    drawSelf() {
        noStroke();

        var angle = atan2(this.yvel, this.xvel);

        var foodPercent = this.food / this.maxFood;

        fill(100, 0, 50, 50);
        rect(this.x - this.size, this.y - this.size / 2 - 5, this.size * 2, 3);

        fill(10, 100, 100);
        rect(this.x - this.size, this.y - this.size / 2 - 5, foodPercent * this.size * 2, 3);

        push();
        translate(this.x, this.y);
        rotate(angle);

        fill(this.hue, 100, 100);
        ellipse(0, 0, this.size * 1.25, this.size);
        triangle(-this.size / 2, 0, -this.size, -this.size / 3, -this.size, this.size / 3);
        pop();
    }

    move() {
        if (frameCount % 120 == this.swimTiming) {
            this.xvel = random(-5, 5);
            this.yvel = random(-5, 5);

            if (random(100) < 2) {
                this.reproduce();
            }

            if (this.food <= 0) {
                this.dead = true;
            }

            this.food -= 2;
        }

        if (placeFree(this, this.x + this.xvel, this.y))
            this.x += this.xvel;
        if (placeFree(this, this.x, this.y + this.yvel))
            this.y += this.yvel;

        this.xvel *= 0.95;
        this.yvel *= 0.95;
    }
}
