var backgroundImg = loadImage("islands.png");
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


var draw = function () {
  if(!crashed) {
    scrollBackground()
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
  if(keyCode == RIGHT) {
    right = true;
  }
  if(keyCode == LEFT) {
    left = true;
  }
  if(keyCode == UP) {
    up = true
  }
  if(keyCode == DOWN) {
    down = true;
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
  if(keyCode == RIGHT) {
    right = false;
  }
  if(keyCode == LEFT) {
    left = false;
  }
  if(keyCode == UP) {
    up = false
  }
  if(keyCode == DOWN) {
    down = false;
  }
}

var scrollBackground = function () {
  image(backgroundImg, 0, backgroundY - 3500)
  image(backgroundImg, 0, backgroundY - 1500);

  backgroundY += 1;

  if(backgroundY > 2000) {
    backgroundY = 0;
  }
}
