var player;
var player2;
var focus = { x: 0, y: 0 };
var players = [];
var canvas;
var resetDistance = 500;
var particles = [];
var projectiles = [];
var screens = [];
var playing = false;
var paused = false;
var menu;
var pausedMenu;

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

    player2 = new Ship(0, 0, 40, 20, [UP_ARROW, DOWN_ARROW, null, null, 16, LEFT_ARROW, RIGHT_ARROW, 18], p2Img, 1, 2, 100);
    player = new Ship(0, 30, 40, 20, [87, 83, 65, 68, 32, 81, 69, LEFT], p1Img, 2, 2, 100);
    players = [player2, player];

    let startButton = new Button(250, 250, 150, 50, "Start Game", function () { menu.page = 1; }, color(130, 0, 180), color(180, 0, 255));
    let tutorialButton = new Button(250, 375, 150, 50, "Tutorial", function () { menu.page = 2; }, color(130, 0, 180), color(180, 0, 255));
    let aboutButton = new Button(250, 450, 200, 50, "About the Game", function () { menu.page = 3; }, color(130, 0, 180), color(180, 0, 255));

    let aboutText = new Text(200, 100, 32, rgb(255, 255, 255), "Cosmic Adventure is a game developed by Evan Halliday and some other kid.
                                                                \nThe game is loosely based on space adventure, survival game.
                                                                \nYou can choose to play as one player, or together with a friend locally.
                                                                \nThe split screen version of the game includes a realtime minimap, and dual
                                                                \nHUD screens for quick view of each player\'s health, speed and remaining bullets.
                                                                \nIn the lower left, statistics regarding the game itself are dispalyed and
                                                                \nupdated in real time for both players to look at throughout the game.
                                                                \n\nThe overall goal of the game is to pickup the various coins throughout the map
                                                                \nand proceed to the unlocked end, whilst defending yourself and sneaking around eachother
                                                                \n(whilst in split screen), and make it to the end first. Whoever makes it first is the winner.
                                                                \n\nHowever in singe player mode, the game is somewhat different, in which the game takes a different
                                                                \napproach and the player races against the chosen number of enemies, from four different options
                                                                \nthat are provided to the player before the game begins, allowing them to race the set amount of AI
                                                                \nships that will attempt to seek the end through various checkpoints and path finding.
                                                                \nFirst person (or AI) to reach the end after three laps is announced the winner.");

    let singlePlayer = new Button(250, 200, 200, 50, "Single Player", function () { players = [player]; start(); }, color(130, 0, 180), color(180, 0, 255));
    let splitButton = new Button(250, 300, 200, 50, "Split Screen", function () { players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));

    let tutorialP1Image = new Image(100, 200, 100, 50, p1Img);
    let tutorialP2Image = new Image(350, 200, 100, 50, p2Img);

    let backButton = new Button(250, 400, 300, 50, "Back to Main Menu", function () { menu.page = 0; }, color(130, 0, 180), color(180, 0, 255));
    let exitButton = new Button(250, 400, 300, 50, "Exit to Main Menu", function() { menu.page = 0; playing = false; paused = false; }, color(130, 0, 180), color(180, 0, 255));

    let unpauseButton = new Button(250, 400, 300, 50, "Return to Game", function () { paused = false; playing = true; }, color(130, 0, 180, 180, 0, 255));

    menu = new Menu("Cosmic Adventure", [[startButton, tutorialButton, aboutButton], [singlePlayer, splitButton, backButton], [backButton, tutorialP1Image, tutorialP2Image], [backButton, aboutText]]);
    pausedMenu = new Menu("Paused", [unpauseButton, backButton]);
}

function start()
{
    background(0)
    playing = true;
    let rows = 1;
    let cols = 1;
    if (players.length > 1)
    {
        cols = 2;
        rows = 2;
    }

    for (var i = 0; i < players.length; i++)
    {
        screens.push(new Screen((width / 2 + i % 2 * width) / cols, (height / 2 + floor(i / 2) * height) / rows, width / cols, height / rows, players[i]));
    }
    if (players.length > 1 && players.length < 4)
    {
        screens.push(new GameMap(width * 0.75, height * 0.75, width / 2, height / 2, { x: -1250, y: -1500 }, 3000, 2000));
    }
}

function draw()
{


  if (!playing)
  {
    menu.draw();
    return;
  }

  if (register[27])
  {
    paused = true;
  }

  if(paused)
  {
    pausedMenu.draw();
    return;
  }



  for (var player of players)
  {
    player.move();
    player.shoot();
  }

  particles = particles.filter((particle) => { return particle.duration > 0 })
  for (var particle of particles)
  {
    particle.move();
  }

  projectiles = projectiles.filter((projectile) => { return !projectile.collided });
  for (var projectile of projectiles)
  {
    projectile.move();
    projectile.collide();
  }

  let screenNum = 0;
  for (var screen of screens)
  {
    let canvas = screen.canvas;
    canvas.push();
    canvas.translate(-screen.focus.x + 250, -screen.focus.y + 250)

    canvas.push();
    canvas.translate(0, -750);
    canvas.image(bkgImage, 0, 0, 3000, 2000);
    canvas.pop();


    for (var p of particles)
    {
      p.draw(canvas);
    }

    for (var p of projectiles)
    {
        p.draw(canvas);
    }

    for (var p of players)
    {
      p.draw(canvas);
    }

    for (var o of obstacles)
    {
      o.draw(canvas);
    }

    finish.draw(canvas);
    canvas.pop();

    screenNum++;

    if(screenNum == 1)
      drawHUD(canvas, player);
    if(screenNum == 2)
      drawHUD(canvas, player2);

  }
  for (var screen of screens)
  {
    fill(255, 0, 0)
    screen.draw();
  }
}

function windowResized()
{
  centerScreen();
}
