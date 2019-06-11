// collectibles if have time
// 2 players mechanic and win/lose depending on deaths and collectiion times?

// bugs:
// ai movement
// make health impact speed to max 0.5?
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
var playerOneWin;
var p1Win;
var p2Win;
var playerTwoWin;
var volumeSlider;


function centerScreen()
{
  var width = (windowWidth - 500) / 2 - 125;
  var height = (windowHeight - 500) / 2 - 125;
  canvas.position(width, height);
}

function setup()
{
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();

    canvas = createCanvas(750, 750);
    centerScreen();
    canvas.parent('cosmic-game-holder');

    player2 = new Ship(0, 0, 30, 40, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 16, 222, 13, 191], p2Img, 1, 2, 0, 100, 2, 8);
    player = new Ship(0, 30, 25, 35, [87, 83, 65, 68, 32, 81, 69, LEFT], p1Img, 2, 2, 0, 100, 1, 8);

    let startButton = new Button(375, 375, 250, 75, "Start Game", function () { menu.page = 1; }, color(130, 0, 180), color(180, 0, 255));
    let tutorialButton = new Button(200, 525, 188, 75, "Tutorial", function () { menu.page = 2; }, color(130, 0, 180), color(180, 0, 255));
    let aboutButton = new Button(490, 525, 300, 75, "About the Game", function () { menu.page = 3; }, color(130, 0, 180), color(180, 0, 255));
    let aiOneButton = new Button(270, 375, 100, 50, "1", function() { selectedAI = 1; gameMusic.playMode('restart'); gameMusic.loop(); players = [player]; start(); setInterval(positionRanking, 500); }, color(130, 0, 180), color(180, 0, 255));
    let aiTwoButton = new Button(270, 475, 100, 50, "4", function() { selectedAI = 4; gameMusic.playMode('restart'); gameMusic.loop(); players = [player]; start(); setInterval(positionRanking, 500); }, color(130, 0, 180), color(180, 0, 255));
    let aiThreeButton = new Button(455, 375, 100, 50, "9", function() { selectedAI = 9; gameMusic.playMode('restart'); gameMusic.loop(); players = [player]; start(); setInterval(positionRanking, 500); }, color(130, 0, 180), color(180, 0, 255));
    let aiFourButton = new Button(455, 475, 100, 50, "19", function() { selectedAI = 19; gameMusic.playMode('restart'); gameMusic.loop(); players = [player]; start(); setInterval(positionRanking, 500); }, color(130, 0, 180), color(180, 0, 255));

    let aboutText = new Text(375, 203, 18, color(255, 255, 255), "Cosmic Adventure is a game developed by Evan and some other kid. \nThe game is loosely based on being space adventure / racing game. \nYou can choose to play as one player, or together with a friend locally. \nHUD screens for quick view of each player\'s health, speed and remaining bullets. \nIn the lower left, statistics regarding the game itself are displayed and \nupdated in real time for both players to look at throughout the game. \n\nThe overall goal of the two player game is to pickup the coins around the map \nand proceed to the unlocked end, whilst defending yourself and sneaking around eachother \nand make it to the end first. Whoever makes it first is the winner. \n\nHowever in single player mode, the game takes a largely different approach in which \nthe player races against the set number of enemies, from four set options \nthat are provided to the player before it starts, allowing them to specify the amount of AI \nships that will attempt to seek the end through various checkpoints and path finding. \nFirst person (or AI) to reach the end after three laps is announced the winner.");

    let versionText = new Text(690, 735, 14, color(255, 255, 255), "Version: 1.7.2");
    let aiText = new Text(375, 290, 24, color(255, 255, 255), "Select the amount of AI ships you want to race around the course.")

    let tutorialP1Text = new Text(205, 365, 20, color(255, 255, 255), "Controls: \nW, A, S, D to move around, \nQ and E to strafe left and right, \nSpace to rapidly boost, \nLeft Click to fire projectiles.");
    let tutorialP2Text = new Text(530, 365, 20, color(255, 255, 255), "Controls: \nUp, Down, Left, Right Arrows to move around, \nQuote and Enter to strafe left and right, \nRight Shift to rapidly boost, \nForward Slash to fire projectiles.");

    let singlePlayer = new Button(375, 285, 250, 75, "Single Player", function () { menu.page = 4; }, color(130, 0, 180), color(180, 0, 255)); //{ players = [player]; start(); setInterval(positionRanking, 500); }, color(130, 0, 180), color(180, 0, 255));
    let splitButton = new Button(375, 435, 250, 75, "Split Screen", function () { gameMusic.playMode('restart'); gameMusic.loop(); players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));

    let tutorialP1Image = new ImageGraphic(p1Img, 195, 295, 125, 125);
    let tutorialP2Image = new ImageGraphic(p2Img, 510, 315, 100, 100);

    let backButton = new Button(375, 595, 325, 50, "Back to Main Menu", function () { menu.page = 0; }, color(130, 0, 180), color(180, 0, 255));
    let playAgainButton = new Button(375, 465, 325, 50, "Play Again", function ()
    {
      playing = false;
      paused = false;
      p1Win = false;
      p2Win = false;
      players = [];
      gameMusic.stop();

      for(screen of screens)
      {
        screen.clear();
      }

      screens = [];
      particles = [];
      projectiles = [];
      player.health = 100;
      player.x = 0;
      player.y = 30;
      player.vx = 0;
      player.vy = 0;
      player.direction = 90;
      player2.health = 100;
      player2.x = 0;
      player2.y = 0;
      player2.vx = 0;
      player2.vy = 0;
      player2.direction = 90;

      gameMusic.playMode('restart');
      gameMusic.loop();
      players = [player, player2];
      start();
    }, color(130, 0, 180), color(180, 0, 255));

    let exitButton = new Button(375, 525, 300, 50, "Exit to Main Menu", function()
    {
      menu.page = 0;
      playing = false;
      p1Win = false;
      p2Win = false;
      paused = false;
      players = [];
      gameMusic.stop();

      for(screen of screens)
      {
        screen.clear();
      }

      screens = [];
      particles = [];
      projectiles = [];
      player.health = 100;
      player.x = 0;
      player.y = 30;
      player.vx = 0;
      player.vy = 0;
      player.direction = 90;
      player2.health = 100;
      player2.x = 0;
      player2.y = 0;
      player2.vx = 0;
      player2.vy = 0;
      player2.direction = 90;
      volumeSlider.hide();
    }, color(130, 0, 180), color(180, 0, 255));
    let unpauseButton = new Button(375, 350, 300, 50, "Return to Game", function () { volumeSlider.hide(); gameMusic.play(); paused = false; playing = true; }, color(130, 0, 180), color(180, 0, 255));
    volumeSlider = createSlider(0, 1, 0.5, 0.1);
    volumeSlider.position(300, 715);
    volumeSlider.style('width', '300px');
    volumeSlider.hide();

    menu = new Menu("Cosmic Adventure", [[startButton, tutorialButton, aboutButton, versionText], [singlePlayer, splitButton, backButton], [backButton, tutorialP1Image, tutorialP2Image, tutorialP1Text, tutorialP2Text], [backButton, aboutText], [backButton, aiText, aiOneButton, aiTwoButton, aiThreeButton, aiFourButton]], true); //, aiText, aiOption1, aiOption2, aiOption3, aiOption4]]);
    pausedMenu = new Menu("Paused", [[unpauseButton, exitButton, volumeSlider], backButton], true);
    playerOneWin = new Menu("Player One Wins", [[playAgainButton, exitButton], backButton], true);
    playerTwoWin = new Menu("Player Two Wins", [[playAgainButton, exitButton], backButton], true);
}

function start()
{
    background(0)
    playing = true;
    p1Win = false;
    p2Win = false;
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
    if (players[1] == player2)
    {
        screens.push(new GameMap(width * 0.5, height * 0.75, width / 2, height / 2, { x: -1250, y: -1500 }, 3000, 2000));
    }
    if(players[1] != player2)
    {
      for (var i = 0; i < selectedAI; i++) {
          players.push(new AIShip(0, i * 25 - 100, 40, 20, aiImg));
      }
    }
}

function draw()
{
  background(0);
  if (!playing)
  {
    menu.draw();
    return;
  }

  if(register[27] && !paused)
  {
    volumeSlider.show();
    gameMusic.pause();
    register[27] = false;
    paused = true;
  }

  if(p1Win)
  {
    playerOneWin.draw();
    return;
  }

  if(p2Win)
  {
    playerTwoWin.draw();
    return;
  }

  if(paused)
  {

    pausedMenu.draw();

    if(register[27])
    {
      paused = false;
      register[27] = false;
      volumeSlider.hide();
      gameMusic.play();
    }
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

    if(players.length < 2)
    {
      for (var ch of checkpoints)
      {
          ch.draw(canvas);
      }
    }

    finish.draw(canvas);
    canvas.pop();

    screenNum++;

    if(screenNum == 1)
    {
      drawHUD(canvas, players[0]);
      continue;
    }
    if(screenNum == 2)
    {
      drawHUD(canvas, players[1]);
      continue;
    }

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

function checkPositions()
{
    let nextCheckpoint = 0
    for (var p of players)
    {

        while (nextCheckpoint < checkpoints.length && checkpoints[nextCheckpoint].players[p.id])
        {
            nextCheckpoint++;
        }
    }

    if (nextCheckpoint < checkpoints.length)
    {
        nextCheckpoint = checkpoints[nextCheckpoint];
    } else {
        nextCheckpoint = finish;
    }

    for (var p1 of players)
    {
        for (var p2 of players)
        {
            if (dist(p1.x, p1.y, p2.x, p2.y) > resetDistance)
            {
                if (dist(p1.x, p1.y, nextCheckpoint.x, nextCheckpoint.y) > dist(p2.x, p2.y, nextCheckpoint.x, nextCheckpoint.y))
                {
                    p1.faults++;
                    p1.x = p2.x;
                    p1.y = p2.y;
                    p1.dir = p2.dir;
                } else {
                    p2.faults++;
                    p2.x = p1.x;
                    p2.y = p1.y;
                    p2.dir = p1.dir
                }
            }
        }
    }
}

function positionRanking()
{
    if(!playing)
    {
        return;
    }

    for(var i = 0; i < players.length; i++)
    {
        for(var j = 0; j < players.length; j++)
        {
            if(i == j){

            }
            else if(players[i].lap > players[j].lap)
            {
                let temp = players[j];
                players[j] = players[i];
                players[i] = temp;
            }
            else if(players[i].nextCheckpoint > players[j].nextCheckpoint)
            {
                let temp = players[j];
                players[j] = players[i];
                players[i] = temp;
            }
            // else if(dist(players[i].x, players[i].y, checkpoints[players[i].nextCheckpoint].x, checkpoints[players[i].nextCheckpoint].y) <
            //     dist(players[j].x, players[j].y, checkpoints[players[i].nextCheckpoint].x, checkpoints[players[i].nextCheckpoint].y)){
            //         let temp = players[j];
            //         players[j]=players[i];
            //         players[i]=temp;
            //     }
        }
    }

    for(var i = 1; i < players.length + 1; i++)
    {
        players[i - 1].place = i;
    }
}
