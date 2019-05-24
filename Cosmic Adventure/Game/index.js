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
  var startButton = new Button(250, 250, 150, 50, "Start Game", function () { menu.page = 1 }, color(130, 0, 180), color(180, 0, 255));
  var singleButton = new Button(250, 250, 200, 50, "Single Player", function () { players = [player]; start(); }, color(130, 0, 180), color(180, 0, 255));
  var twoButton = new Button(250, 375, 200, 50, "Split Screen", function () { players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));
  menu = new Menu("Cosmic Adventure", [[startButton], [singleButton, twoButton]]);
}

function draw()
{
  if(!playing)
  {
    menu.draw();
    return;
  }
}

function start()
{
  var rows = 1;
  var columns = 1;
  background(0);
  playing = true;

  if (players.length > 1) {
    rows = 2;
    columns = 2;
  }
}

function windowResized()
{
  centerScreen();y
}
