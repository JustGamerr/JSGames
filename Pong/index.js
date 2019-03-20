var player1;
var player2;
var ball;

var scoreP1 = 0;
var scoreP2 = 0;

var setup = function() {
  size(500, 500);
  player1 = {
    x: 10,
    y: 200,
    w: 15,
    h: 100,
    speed: 5,
    up: false,
    down: false
  }

  player2 = {
    x: 475,
    y: 200,
    w: 15,
    h: 100,
    speed: 5,
    up: false,
    down: false
  }

  ball = {
    x: 250,
    y: 250,
    w: 20,
    h: 20,
    spdx: random(-5, 5),
    spdy: random(-5, 5),
  }

}

var draw = function(){
 // background(0);
  noStroke();
  fill(0, 25);
  rect(0, 0, 500, 500);
  halfLine();
  drawScore();
  drawPlayers();
  movePlayers();

  drawBall();
  moveBall();
};

function halfLine() {
  for (var i = 0; i < 13; i++) {
    fill(255);
    rect(245, 40 * i, 10, 20);
  }
}

function drawScore() {
  textSize(25);
  fill(255, 0, 0);
  text("Player 1: " + scoreP1, 10, 25);

  fill(0, 128, 255);
  text("Player 2: " + scoreP2, 370, 25);
}

function drawPlayers() {
  fill(255, 0, 0);
  rect(player1.x, player1.y, player1.w, player1.h);

  fill(0, 128, 255);
  rect(player2.x, player2.y, player2.w, player2.h);
}

function drawBall() {
  ellipseMode(CORNER);
  fill(255);
  ellipse(ball.x, ball.y, ball.w, ball.h);
}

function moveBall() {
  ball.x += ball.spdx;
  ball.y += ball.spdy;

  if(ball.x > 500 - ball.w) {
    setup();
    scoreP1++;
  }

  if(ball.x < 0) {
    setup();
    scoreP2++;
  }

  if(ball.y > 500 - ball.h) {
    ball.spdy *= -1;
  }

  if(ball.y < 0) {
    ball.spdy *= -1;
  }

  if(collision(player1, ball)) {
    ball.spdx *= -1;
    ball.spdx += 0.5;
  }

    if(collision(player2, ball)) {
    ball.spdx *= -1;
    ball.spdx -= 0.5;
  }

}

function movePlayers() {
  if(player1.up && player1.y > -1) {
    player1.y -= player1.speed;
  }

  if(player1.down && player1.y < 500 - player1.h) {
    player1.y += player1.speed;
  }

  if(player2.up && player2.y > -1) {
    player2.y -= player2.speed;
  }

  if(player2.down && player2.y < 500 - player2.h) {
    player2.y += player2.speed;
  }
}

function collision(obj1, obj2) {
  if ( obj1.x + obj1.w > obj2.x &&
        obj1.x < obj2.x + obj2.w &&
        obj2.y + obj2.h > obj1.y &&
        obj2.y < obj1.y + obj1.h ) {
      return true;
  } else {
      return false;
  }
}

var keyPressed = function() {
  if(keyCode === UP_ARROW) {
    player2.up = true;
  }

  if(keyCode === DOWN_ARROW) {
    player2.down = true;
  }

  if(keyCode === 87) {
    player1.up = true;
  }

  if(keyCode === 83) {
    player1.down = true;
  }
}

var keyReleased = function() {
  if(keyCode === UP_ARROW) {
    player2.up = false;
  }

  if(keyCode === DOWN_ARROW) {
    player2.down = false;
  }

  if(keyCode === 87) {
    player1.up = false;
  }

  if(keyCode === 83) {
    player1.down = false;
  }
}
