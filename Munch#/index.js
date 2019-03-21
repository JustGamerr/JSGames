var backgroundImg;
var backgroundY = 0;
var player = {x: 250, y:450, size:40};
var speed = 5;
var left= false;
var right = false;
var up = false;
var down = false;
var enemies = [];
var rate = 3;
var crashed = false;

var setup = function() {
  createCanvas(500, 500);
}

var draw = function () {
  if(!crashed) {
    noStroke();
    fill(255, 255, 255, 25);
    rect(0, 0, 500, 500);
    drawPlayer();
    movePlayer();
    drawEnemies();
    doEnemies();
  }
}

var drawPlayer = function() {
  fill(255, 0, 0);
  triangle(player.x - player.size/2, player.y, player.x + player.size/2, player.y, player.x, player.y - player.size*3/4)
}
var movePlayer = function() {
  if(left && player.x > 20) {
    player.x -= speed;
  }
  if(right && player.x < 480) {
    player.x += speed;
  }
  if(up && player.y > 30) {
    player.y -= speed;
  }
  if(down && player.y < 500) {
    player.y += speed;
  }
}
var drawEnemies = function() {
  for(var enemy of enemies) {
    fill(0, 255, 0);
    triangle(enemy.x - enemy.size/2, enemy.y, enemy.x + enemy.size/2, enemy.y, enemy.x, enemy.y + enemy.size*3/4)
  }
}

var doEnemies = function() {
  if(random(0, 100) < rate) {
    var newEnemy = {x:random(0, 500), y: -50, yspeed: random(1,5), size: random(10, 100)};
    enemies.push(newEnemy);
  }
  for(var enemy of enemies) {
    enemy.y += enemy.yspeed;
    if(collision(enemy, player)) {
      crashed = true;
    }
  }
}

var keyPressed = function() {
  if(keyCode == RIGHT_ARROW) {
    right = true;
  }
  if(keyCode == LEFT_ARROW) {
    left = true;
  }
  if(keyCode == UP_ARROW) {
    up = true
  }
  if(keyCode == DOWN_ARROW) {
    down = true;
  }
  if(keyCode === 82 && crashed) {
    setup();
  }
}

var collision = function(enemy, player) {
  var minDist = 3;

  var plx = player.x - player.size/2;
  var prx = player.x + player.size/2;
  var py = player.y;

  var erx = enemy.x + enemy.size/2;
  var elx = enemy.x - enemy.size/2;
  var ey = enemy.y;

  for(var i = 0; i <= player.size/2; i++) {
    for(var j = 0; j <= enemy.size/2; j++) {
      if(dist(plx + i, py - i*1.5, erx - j, ey + j * 1.5) < minDist) {
        return true;
      }
      if(dist(prx - i, py - i*1.5, elx + j, ey + j * 1.5) < minDist) {
        return true;
      }
    }
  }
  return false;
};
var keyReleased = function() {
  if(keyCode == RIGHT_ARROW) {
    right = false;
  }
  if(keyCode == LEFT_ARROW) {
    left = false;
  }
  if(keyCode == UP_ARROW) {
    up = false
  }
  if(keyCode == DOWN_ARROW) {
    down = false;
  }
}
