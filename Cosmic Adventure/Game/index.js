var player;
var player2;
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
  menu = new Menu("Cosmic Adventure", 2, color(0, 0, 0), color(0, 191, 255));
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
  background(0);
  playing = true;
}

function windowResized()
{
  centerScreen();
}
