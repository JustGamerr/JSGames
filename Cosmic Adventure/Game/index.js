var player;
var player2;
var pickups = [];
var menu;
var playing = false;
var screens = [];
var focus = {x: 0, y: 0};

function setup()
{
  rectMode(CENTER);
  imageMode(CENTER);
  noStroke();
  createCanvas(500, 500);
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
