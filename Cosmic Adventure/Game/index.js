var player;
var player2;
var players = [];
var pickups = [];
var canvas;
var menu;
var playing = false;
var screens = [];
var focus = {x: 0, y: 0};

function centerScreen()
{
  var width = (windowWidth - 500) / 2;
  var height = (windowHeight - 500) / 2;
  canvas.position(width, height);
}

function setup()
{
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  canvas = createCanvas(500, 500);
  centerScreen();
  canvas.parent('cosmic-game-holder');

  player = new Ship(0, 0, 40, 20, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW], p1IdleImg, 1, 2);
  player2 = new Ship(0, 30, 40, 20, [87, 83, 65, 68, 32, 81, 69, LEFT], p2IdleImg, 2, 2);

  var startButton = new Button(250, 250, 150, 50, "Start Game", function () { menu.page = 1 }, color(130, 0, 180), color(180, 0, 255));
  var singleButton = new Button(250, 250, 200, 50, "Single Player", function () { players = [player]; start(); }, color(130, 0, 180), color(180, 0, 255));
  var twoButton = new Button(250, 375, 200, 50, "Split Screen", function () { players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));
  menu = new Menu("Cosmic Adventure", [[startButton], [singleButton, twoButton]]);
}

function start()
{
  var rows = 1;
  var columns = 1;

  background(0);
  playing = true;

  if (players.length == 2)
  {
    rows = 2;
    columns = 2;
  }

  for(var i = 0; i < players.length; i++)
  {
    screens.push(new Screen((width / 2 + i % 2 * width) / columns, (height / 2  + floor(i / 2) * height) / rows, width / columns, height / rows, players[i]));
  }

  if(players.length == 2)
  {
    screens.push(new GameMap(width * 0.75, height * 0.75, width / 2, height / 2, {x: -1250, y:-1500}, 3000, 2000));
  }

}

function draw()
{
  if(!playing)
  {
    menu.draw();
    return;
  }

  for(var player of players)
  {
    player.move();
    player.shoot();
  }

  for(var screen of screens)
  {
    var screenCanvas = screen.canvas;

    screenCanvas.push();
    screenCanvas.translate(-screen.screenFocus.x + 250, -screen.screenFocus.y + 250);

    screenCanvas.push();
    screenCanvas.translate(0, -750);
    screenCanvas.image(bkgImage, 0, 0, 3000, 2000);
    screenCanvas.pop();

    for(var player of players)
    {
      player.draw(screenCanvas);
    }

    for(var obstacle of obstacles)
    {
      obstacle.draw(screenCanvas);
    }

    screenCanvas.pop();
    drawHUD(screenCanvas);
  }
}

function windowResized()
{
  centerScreen();
}
