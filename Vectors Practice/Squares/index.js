var block;
var blocka;

var setup = function() {
  createCanvas(500, 500);
  block = {x: 0, y: 50, w: 50, h: 50, xspeed: random(3,20), yspeed: random(5,15), hue: 0};
  blocka = {x: 50, y: 450, w: 50, h: 50, xspeed: random(1,6), yspeed: random(1,6), hue: 0};
}

var draw = function() {
  noStroke()
  colorMode(HSB, 100);
  fill(block.hue, random(0.1, 100), random(75, 100))
  block.hue += 0.1;
  if(block.hue > 100) {
    block.hue = 0
  }
  blocka.hue += 0.7
  if(blocka.hue > 100) {
    blocka.hue = 0
  }
  //for(var i = 0; i < 100; i++) {
  rect(block.x, block.y, block.w, block.h);
  fill(blocka.hue, random(0.1, 100), random(75, 100))
  rect(blocka.x, blocka.y, blocka.w, blocka.h);
  //rect(block.y, block.x, block.w, block.h)

  //}
  block.x += block.xspeed;
  block.y += block.yspeed;
  if(block.y > 450 || block.y < 0) {
    block.yspeed *= -1
  }
  if(block.x > 450 || block.x < 0) {
    block.xspeed *= -1
  }
    blocka.x += blocka.xspeed;
  blocka.y += blocka.yspeed;
  if(blocka.y > 450 || blocka.y < 0) {
    blocka.yspeed *= -1
  }
  if(blocka.x > 450 || blocka.x < 0) {
    blocka.xspeed *= -1
  }
}
