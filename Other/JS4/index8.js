var points = []

function setup() {
  createCanvas(500, 500)
  noStroke()
  colorMode(HSB, 100)
  let radius = 100;
  let hue = 0;
  for(let angle = 0; angle < 2*PI; angle += PI/6) {
      let x = radius * cos(angle);
      let y = radius * sin(angle);

      x += width/2;
      y += width/2;
      hue = angle / (2*PI) * 100;
      points.push(new Point(x, y, hue, angle));
  }
}
function draw() {
  fill(0,0,0, 40);
  if(frameCount % 40 === 0) {
      rect(0, 0, width, height);
  }

  for(let point of points) {
      radius = 70 + 20 * sin(this.angle/6)
      this.size = 20 * sin(this.angle/3);
      point.update();
  }

}
