let gridSize = 20;
let snake;
let newDir;
let timer;
let tickSpeed;
let apple;
let score;
let crashed;
let paused;

var setup = function() {
  createCanvas(500, 500);
  background(0);
  newDir = "right";
  timer = millis();
  tickSpeed = 50;
  score = 0;
  textSize(32);
  textAlign(CENTER, TOP);
  crashed = false;
  paused = false;

  apple = {
    x: floor(random(0, width/gridSize))*gridSize + 10,
    y: floor(random(5, height/gridSize))*gridSize + 10
  };

  snake = {
    dir: "right",
    x: 110,
    y: 50,
    tail: [
      {x: 50, y: 50},
      {x: 70, y: 50},
      {x: 90, y: 50}
      ]
  };
};

var draw = function() {
  if(paused) {
    return;
  }
  if(millis() - timer >= tickSpeed) {
  background(0);
  snake.dir = newDir;
  if(!crashed) {
  moveSnake();

  }
  drawSnake();
  crashCheck();
  eatApple();
  drawApple();
  drawScore();
  timer = millis();
  }
}
var crashCheck = function() {
  for(let i = 0; i < snake.tail.length; i++) {
    if(snake.x == snake.tail[i].x && snake.y == snake.tail[i].y) {
      crashed = true;
      fill(255, 255, 0);
      ellipse(snake.x, snake.y, gridSize, gridSize);
      stroke(255, 0, 0);
      strokeWeight(4);
      line(snake.x - 10, snake.y - 10, snake.x + 10, snake.y + 10);
      line(snake.x - 10, snake.y + 10, snake.x + 10, snake.y - 10);
    }
  }
}
var drawSnake = function() {
  fill(255, 255, 0);
  ellipse(snake.x, snake.y, gridSize, gridSize);
  for(let i = 0; i < snake.tail.length; i++) {
    fill(0, 255, 0);
    stroke(0, 0, 0);
    strokeWeight(1);
    ellipse(snake.tail[i].x, snake.tail[i].y, gridSize, gridSize);
  }
};

var moveSnake = function() {
  snake.tail.push({x: snake.x, y: snake.y});
  if(snake.dir === "right") {
    snake.x += gridSize;
  } else if (snake.dir === "left") {
    snake.x -= gridSize;
  } else if (snake.dir === "up") {
    snake.y -= gridSize;
  } else if (snake.dir === "down") {
    snake.y += gridSize;
  }
  wrap();
  snake.tail.splice(0, 1);
};
var moveApple = function() {
  apple.x = floor(random(0, width/gridSize))*gridSize + 10;
  apple.y = floor(random(0, height/gridSize))*gridSize + 10;
  for(let i = 0; i < snake.tail.length; i++) {
    if(apple.x === snake.tail[i].x && apple.y === snake.tail[i].y) {
      moveApple();
    }
  }
}
var wrap = function() {
  if(snake.x > width) {
    snake.x = snake.x - width;
  } else if(snake.x < 0) {
    snake.x = snake.x + width;
  } else if(snake.y > height) {
    snake.y = snake.y - height;
  } else if(snake.y < 0) {
    snake.y = snake.y + height;
  }
};
var drawScore = function() {
  fill(255, 255, 255);
  stroke(0);
  textSize(36);
  text(score, 250, 0)
  noStroke();
}
var drawApple = function() {
  fill(255, 0, 0);
  ellipse(apple.x, apple.y, gridSize, gridSize);
};
var eatApple = function() {
  if(snake.x === apple.x && snake.y === apple.y) {
    snake.tail.push({x: snake.x, y: snake.y});
    moveApple();
    score++;
  }
}
var keyPressed = function() {
  if(keyCode === RIGHT_ARROW && snake.dir !== "left") {
    newDir = "right";
  }
  if(keyCode === LEFT_ARROW && snake.dir !== "right") {
    newDir = "left";
  }
  if(keyCode === UP_ARROW && snake.dir !== "down") {
    newDir = "up";
  }
  if(keyCode === DOWN_ARROW && snake.dir !== "up") {
    newDir = "down";
  }
  if(keyCode === 82 && crashed) {
    setup();
  }
  if(keyCode == 80 && !crashed) {
    if(paused) {
      paused = false
    } else {
      paused = true;
      fill(30, 30, 30);
      rect(width/2 - 100, height/2 - 50, 200, 100);
      fill(0, 255, 0);
      text("PAUSED", width/2, height/2 - 20)
    }
  }
};
