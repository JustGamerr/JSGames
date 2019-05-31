var player;
var player2;
var players = [];
var pickups = [];
var menu;
var playing = false;
var screens = [];
var focus = {x: 0, y: 0};
var bkgImg;
var p1Img;
var p1IdleImg;
var p1FlameImg;
var p1MovingImg;
var p2Img;
var p2IdleImg;
var p2FlameImg;
var p2MovingImg;
var shipImages = [];

function setup()
{
  bkgImage = loadImage("http://cosmicadventure.xyz/game/resources/bkgImage.jpg");

  p1Img = loadImage("http://cosmicadventure.xyz/game/resources/p1full.gif");
  p1IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p1idle.png");
  p1FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p1fullflame.png");
  p1MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p1moving.gif");

  p2Img = loadImage("http://cosmicadventure.xyz/game/resources/p2full.gif");
  p2IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p2idle.png");
  p2FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p2fullflame.png");
  p2MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p2moving.gif");

  shipImages = [p1Img, p1IdleImg, p1FlameImg, p1MovingImg, p2Img, p2IdleImg, p2FlameImg, p2MovingImg];

  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  createCanvas(500, 500);
  player2 = new Ship(0, 0, 40, 20, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW], p2IdleImg, 1, 2);
  player = new Ship(0, 30, 40, 20, [87, 83, 65, 68, 32, 81, 69, LEFT], p1IdleImg, 2, 2);
  let startButton = new Button(250, 250, 150, 50, "Start Game", function () { menu.page = 1 }, color(130, 0, 180), color(180, 0, 255));
  let singlePlayer = new Button(250, 250, 200, 50, "Single Player", function () { players = [player]; start(); }, color(130, 0, 180), color(180, 0, 255));
  let twoPlayer = new Button(250, 375, 200, 50, "Split Screen", function () { players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));
  menu = new Menu("Cosmic Adventure", [[startButton], [singlePlayer, twoPlayer]])
}

function start()
{
  background(0)
  playing = true;
  let rows = 1;
  let cols = 1;
  if (players.length > 1) {
      cols = 2;
      rows = 2;
  }

  for (var i = 0; i < players.length; i++) {

      screens.push(new Screen((width / 2 + i % 2 * width) / cols, (height / 2 + floor(i / 2) * height) / rows, width / cols, height / rows, players[i]));
  }
  if (players.length > 1 && players.length < 4) {
      screens.push(new GameMap(width * 0.75, height * 0.75, width / 2, height / 2, { x: -1250, y: -1500 }, 3000, 2000));
  }
}

function draw()
{
  if(!playing)
  {
    menu.draw();
    return;
  }
  for (var player of players) {
      player.move();
      player.shoot();
  }
  // projectiles = projectiles.filter((projectile) => { return !projectile.collided });
  // for (var projectile of projectiles) {
  //     projectile.move();
  //     projectile.collide();
  // }
  for (var screen of screens) {
      let c = screen.canvas;
      c.push();
      c.translate(-screen.focus.x + 250, -screen.focus.y + 250)

      c.push()
      c.translate(0, -750)
      c.image(bkgImage, 0, 0, 3000, 2000)
      c.pop()

      // for (var p of projectiles) {
      //     p.draw(c);
      // }

      for (var p of players) {
          p.draw(c);
      }

      for (var o of obstacles) {
          o.draw(c);
      }

      c.pop();
      drawHUD(c);
  }
  for (var screen of screens) {
      fill(255, 0, 0)
      screen.draw();
  }
}

// function windowResized()
// {
//   centerScreen();
// }
