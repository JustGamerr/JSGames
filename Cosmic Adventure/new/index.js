var player;
var player2;
var focus = { x: 0, y: 0 };
var players = [];
var resetDistance = 500;
var particles = [];
var projectiles = [];
var screens = [];
var playing = false;
var menu;

function setup()
{
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    createCanvas(500, 500);

    player2 = new Ship(0, 0, 40, 20, [UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW], shipImg3, 1, 2);
    player = new Ship(0, 30, 40, 20, [87, 83, 65, 68, 32, 81, 69, LEFT], shipImg2, 2, 2);
    players = [player2, player];

    let startButton = new Button(250, 250, 100, 50, "Start", function () { menu.page = 1 }, color(130, 0, 180), color(180, 0, 255));
    let singlePlayer = new Button(250, 250, 200, 50, "One Player", function () { players = [player]; start(); }, color(130, 0, 180), color(180, 0, 255));
    let twoPlayer = new Button(250, 375, 200, 50, "Two Player", function () { players = [player, player2]; start(); }, color(130, 0, 180), color(180, 0, 255));

    menu = new Menu("Space Game", [[startButton], [singlePlayer, twoPlayer]])
    setInterval(positionRanking,500)
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
    // focus.x = 0;
    // focus.y = 0;
    // for (var p of players) {
    //     focus.x += p.x;
    //     focus.y += p.y
    // }
    // focus.x /= players.length;
    // focus.y /= players.length;
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
    for (var screen of screens)
    {
        let c = screen.canvas;
        c.push();
        c.translate(-screen.focus.x + 250, -screen.focus.y + 250)

        c.push()
        c.translate(0, -750)
        c.image(starsImg, 0, 0, 3000, 2000)
        c.pop()


        for (var p of particles)
        {
            p.draw(c);
        }


        for (var p of projectiles)
        {
            p.draw(c);
        }

        //background(0);
        for (var p of players)
        {
            p.draw(c);
            // for(var p2 of players.filter((player)=>{return player!=p})){
            //     if(rotatedRectangularCollision(p,p2)){
            //         momentum(p,p2)
            //     }
            // }
        }
        //checkPositions();

        //console.log(findCorners(player));
        for (var o of obstacles)
        {
            o.draw(c);
        }



        for (var ch of checkpoints)
        {
            ch.draw(c);
        }
        finish.draw(c);


        c.pop();
        drawHUD(c);
    }
    for (var screen of screens)
    {
        fill(255, 0, 0)
        screen.draw();
    }
    //positionRanking();
}

function checkPositions() {
    let nextCheckpoint = 0
    for (var p of players) {

        while (nextCheckpoint < checkpoints.length && checkpoints[nextCheckpoint].players[p.id]) {
            nextCheckpoint++;
        }
    }

    if (nextCheckpoint < checkpoints.length) {
        nextCheckpoint = checkpoints[nextCheckpoint];
    } else {
        nextCheckpoint = finish;
    }
    for (var p1 of players) {
        for (var p2 of players) {
            if (dist(p1.x, p1.y, p2.x, p2.y) > resetDistance) {
                if (dist(p1.x, p1.y, nextCheckpoint.x, nextCheckpoint.y) > dist(p2.x, p2.y, nextCheckpoint.x, nextCheckpoint.y)) {
                    p1.faults++;
                    p1.x = p2.x;
                    p1.y = p2.y;
                    p1.direction = p2.direction;
                } else {
                    p2.faults++;
                    p2.x = p1.x;
                    p2.y = p1.y;
                    p2.direction = p1.direction
                }
            }
        }
    }
}

function positionRanking(){
    if(!playing){
        return;
    }

    for(var i =0; i<players.length; i++){
        for(var j=0; j<players.length; j++){
            if(i==j){

            }
            else if(players[i].lap>players[j].lap){
                let temp = players[j];
                players[j]=players[i];
                players[i]=temp;
            }
            else if(players[i].nextCheckpoint>players[j].nextCheckpoint){
                let temp = players[j];
                players[j]=players[i];
                players[i]=temp;
            }
            // else if(dist(players[i].x, players[i].y, checkpoints[players[i].nextCheckpoint].x, checkpoints[players[i].nextCheckpoint].y) <
            //     dist(players[j].x, players[j].y, checkpoints[players[i].nextCheckpoint].x, checkpoints[players[i].nextCheckpoint].y)){
            //         let temp = players[j];
            //         players[j]=players[i];
            //         players[i]=temp;
            //     }
        }
    }

    for(var i=1; i<players.length+1; i++){
        players[i-1].place = i;
    }
}
