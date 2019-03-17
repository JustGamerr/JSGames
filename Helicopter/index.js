var player = {x:150, y:250, size:50};
var coins = [];
var gravity = 0;
var goUp = false;
var crashed = false;
var score = 0;
var gap = {height: 250, y: 250};
var walls = [];
var smoke = []
var wallTimer = 0

// var setup = function() {
//   setInterval(createSmoke, 100)
// }

var draw = function() {
  noStroke();
  background(0,0,0)
  drawPlayer();
  drawScore();
  drawWalls()

  if(!crashed) {
    movePlayer();
    doCoin();
    createSmoke();
    doSmoke()
    moveWalls();
    //console.log(walls)
  } else {
    youLoseScreen()
  }
}
var moveWalls = function() {
  for(var wall of walls) {
    wall.x -= 3;

    if(wall.x < player.x && wall.x + wall.w > player.x) {
      if(player.y - player.size/2 < wall.y + wall.h &&
      player.y + player.size/2 > wall.y) {
        crashed = true
      }
    }
  }
  if(wallTimer <= 0) {
    wallTimer = 16;
    gap.y += 25 * floor(random(3) - 1)

    if(gap.y < 150) {
      gap.y = 150;
    }
    if(gap.y > 350) {
      gap.y = 350
    }
    var newWall = {x: 500, y:0, w:50, h:gap.y - gap.height/2};
    walls.push(newWall);
     newWall = {x: 500, y: gap.y+gap.height/2, w:50, h: 250};
     walls.push(newWall)
  }
  wallTimer -= 1;
}
var doSmoke = function() {

  smoke = smoke.filter((s) => {return s.x > -50});

  for(var s of smoke) {
    fill(255, 140, 0, 175);
    ellipse(s.x, s.y, s.size, s.size);

    s.x -= 4;
    s.size++;
  }
}
var createSmoke = function() {
  var newSmoke = {x:player.x-30, y:player.y, size:10};
  smoke.push(newSmoke);
}
var drawWalls = function() {
  for(var wall of walls) {
    fill(0, 255, 0)
    rect(wall.x, wall.y, wall.w, wall.h);
  }
}


var drawPlayer = function() {
  fill(0, 0, 255);
  ellipse(player.x, player.y, player.size, player.size);
}
var movePlayer = function() {
  if(goUp) {
    gravity -= 0.4;
  } else {
    gravity += 0.4;
  }
  player.y += gravity;

  if(player.y > 500 || player.y < 0) {
    crashed = true;
  }
}

var doCoin = function() {
  var filteredCoins = coins.filter((coin) => {return coin.x > 0 && !coin.collected});
  coins = filteredCoins;

  if(random(0, 100) < 2) {
    var newCoin = {x: 600, y: random(150, 350), size: 20, collected: false};
    coins.push(newCoin);
  }

  for(var coin of coins) {


    fill(255, 255, 0);
    ellipse(coin.x, coin.y, coin.size, coin.size);

    coin.x -= 3;

    var playerRadius = player.size / 2;
    var coinRadius = coin.size / 2;
    var touchDistance = playerRadius + coinRadius;

    if(dist(player.x, player.y, coin.x, coin.y) < playerRadius + coinRadius) {
      coin.collected = true;
      score += 1;
    }
  }
}
var mousePressed = function() {
  if(mouseButton === LEFT) {
    goUp = true

    if(crashed) {
      crashed = false;
      player.y = 250;
      gravity = 0;

      score = 0;
      coins = [];
      walls = [];
      smoke = [];
    }
  }
}
var mouseReleased = function() {
  if(mouseButton === LEFT) {
    goUp = false;
  }
}
var drawScore = function() {
  fill(255, 255, 0);
  textSize(24);
  text(score, 50, 450);
};
var youLoseScreen = function() {
  fill(255)
  textSize(24)
  text("Game Over", 200, 200);
  text("Click to Restart", 180, 350);
}
