class Point {
  constructor(centerx, centery, hue, startingAngle, speed, radius) {
    this.cx = centerx;
    this.cy = centery;
    this.hue = hue;
    this.angle = startingAngle || 0;
    this.speed = speed || 1;
    this.radius = radius || 70;
  }
  move() {
    this.angle += this.speed * PI/60;
    this.radius = 140 * sin(this.angle);
  }
  draw() {
    let r = this.radius;
    let x = r * cos(this.angle);
    let y = r * sin(this.angle);

    fill(this.hue, 100, 100);
    ellipse(this.cx + x, this.cy + y, 12, 12);
  }
  update() {
    this.move();
    this.draw();
  }
}
