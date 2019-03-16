var cWidth = 300;
var cHeight = 300;

var fish;
var plant;
var fishArray = [];
var plantsArray = [];

function setup() {
    createCanvas(cWidth, cHeight);
    colorMode(HSB, 100);

    while(fishArray.length < 5) {
        fish = new Fish(random(cWidth - 20) + 10, random(cHeight - 20) + 10);
        fish.mutate();
        fishArray.push(fish);
    }

    //while(plantsArray.length < 30) {
    //    plant = new Plant(random(cWidth - 20) + 10, random(cHeight - 20) + 10);
    //    plant.push(fish);
    //}
}

function draw() {
    background(65, 70, 70);
    fill(0);

    fishArray = fishArray.filter(f => f.dead === false);

    for (var eachFish of fishArray) {
        eachFish.drawSelf();
        eachFish.move();
    }
}

function placeFree(obj, x, y) {
    if (x - obj.size/2 < 0)
        return false;
    if(x + obj.size/2 > cWidth)
        return false;
    if(y - obj.size/2 < 0)
        return false;
    if(y + obj.size/2 > cHeight)
        return false;

    return true;

}
