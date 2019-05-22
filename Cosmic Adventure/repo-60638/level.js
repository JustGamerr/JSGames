var obstacles = [
    new Obstacle(-250, -250, 1500, 100),
    new Obstacle(0, 250, 3100, 100),
    new Obstacle(1500, -750, 100, 2100),
    new Obstacle(0, -1750, 3100, 100),
    new Obstacle(-1500, -750, 100, 2100),

    new Obstacle(750, -125, 100, 750),
    new Obstacle(450, -500, 100, 500),
    new Obstacle(750, -750, 700, 100),
    new Obstacle(1050, -500, 100, 500),

    new Obstacle(0, -1250, 100, 1000),
    new Obstacle(-500, -750, 100, 1100),
    new Obstacle(-750, -1250, 500, 100),
    new Obstacle(-1250, -750, 500, 100),

    new Obstacle(800, -1500, 1500, 500),
    new Obstacle(800, -915, 175, 175),
    // new Obstacle(250, -1200, 150, 150),
    // new Obstacle(700, -1300, 225, 225),
    // new Obstacle(1300, -1200, 450, 150)
]

var checkpoints = [

    new Checkpoint(600, -250, 250, 10),
    new Checkpoint(750, -600, 10, 250),
    new Checkpoint(900, -250, 250, 10),
    new Checkpoint(1250, -250, 450, 10),
    new Checkpoint(1250, -750, 450, 10),
    new Checkpoint(500, -1000, 10, 500),
    new Checkpoint(0, -500, 10, 500),
    new Checkpoint(-500, -1500, 10, 450),
    new Checkpoint(-1250, -1250, 500, 10),
    new Checkpoint(-750, -750, 500, 10),
    new Checkpoint(-1250, -250, 500, 10)
];

var finish = new FinishLine(0, 0, 10, 500);