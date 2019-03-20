var point1;
var point2;
var point3;
var point4;
var h = 50;

var setup = function() {
  createCanvas(750, 750);

  point1 = {x: 250, y:250, xspeed:random(-10, 10), yspeed: random(-10, 10)};
  point2 = {x: 250, y:250, xspeed:random(-10, 10), yspeed: random(-10, 10)};
  point3 = {x: 250, y:250, xspeed:random(-10, 10), yspeed: random(-10, 10)};
  point4 = {x: 250, y:250, xspeed:random(-10, 10), yspeed: random(-10, 10)};
}

var draw = function() {
  colorMode(HSB);
  stroke(h % 255, 255, 255);
  strokeWeight(5, 5, 5);
  h+=1;
  move(point1);
  move(point2);
  move(point3);
  move(point4);

  noFill();
  quad(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y, point4.x, point4.y);
  // curve(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y, point4.x, point4.y)
  // triangle(point1.x, point1.y, point2.x, point2.y, point3.x, point3.y);
  // line(point1.x, point1.y, point2.x, point2.y);
  // line(point1.x, point1.y, point2.x, point2.y);
  // line(point2.x, point2.y, point3.x, point3.y);
  // line(point3.x, point3.y, point1.x, point1.y);
};
var move = function(point) {
  point.x += point.xspeed;
  point.y += point.yspeed;

  if(point.x > 500 || point.x < 0) {
    point.xspeed *= -1;
  }
  if(point.y > 500 || point.y < 0) {
    point.yspeed *= -1;
  }
};
