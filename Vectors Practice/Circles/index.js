var balls = [];
var gravity;

class Ball {
    constructor() {
        this.position = new Vector(random(100, 400), 150);
        this.velocity = new Vector(random(-5,5), random(-5,5));
        this.acceleration = gravity;
        this.size = random(10, 75)
        this.color = color(random(0, 255), 0, random(0, 255));
        this.elasticity = random(0.5, 0.9);
    }
}

function setup() {
    createCanvas(500, 500);
    gravity = new Vector(0, 0.2)

    while(balls.length < 20) {
        balls.push(ball = new Ball());
    }
}

function draw() {
    background(140, 160, 180);
    drawBall();
    moveBall();
}

function drawBall() {
    for(var ball of balls) {
        noStroke();
        fill(ball.color);
        ellipse(ball.position.x, ball.position.y, ball.size, ball.size);
    }
}

function moveBall() {
    for(var ball of balls) {
        ball.position = ball.position.plus(ball.velocity);
        ball.velocity = ball.velocity.plus(ball.acceleration);
        ball.position = ball.position.plus(ball.velocity);

        if(ball.position.y > 500 - ball.size/2) {
            ball.position.y = 500 - ball.size/2
            ball.velocity.y *= -1;
            ball.velocity = ball.velocity.scale(ball.elasticity);
        }
        if(ball.position.y < 0 + ball.size/2) {
            ball.position.y = 0 + ball.size/2;
            ball.velocity.y *= -1;
        }
        if(ball.position.x > 500 - ball.size/2) {
            ball.position.x = 500 - ball.size/2;
            ball.velocity.x * -1
        }
        if(ball.position.x < 0 + ball.size/2) {
            ball.position.x = 0 + ball.size/2;
            ball.velocity.x * -1;
        }
    }
}

function mousePressed() {
    for(var ball of balls) {
        let dist = new Vector(mouseX - ball.position.x, mouseY - ball.position.y);
        let force = dist.scale(0.1);
        ball.velocity = ball.velocity.plus(force);
    }
}
