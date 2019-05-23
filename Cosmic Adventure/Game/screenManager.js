class Screen
{
  constructor(x, y, w, h, screenFocus)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.screenFocus = screenFocus;
    this.canvas = createGraphics(500, 500);
    this.canvas.rectMode(CENTER);
    this.canvas.imageMode(CENTER);
    this.canvas.background(0);
  }

  draw()
  {
    this.canvas.noFill(0);
    this.canvas.stroke(0);
    this.canvas.strokeWeight(20);
    this.canvas.rect(250, 250, 500, 500);

    this.canvas.noStroke();
    image(this.canvas, this.x, this.y, this.w, this.h);
  }
}

class GameMap extends Screen
{
  constructor(x, y, w, h, screenFocus, screenSizeW, screenSizeH)
  {
    super(x, y, w, h, screenFocus);
    this.canvas = createGraphics(screenSizeW, screenSizeH);
    this.canvas.rectMode(CENTER);
    this.canvas.imageMode(CENTER);
  }

  draw()
  {
    this.canvas.noFill(0);
    this.canvas.stroke(0);
    this.canvas.strokeWeight(20);
    this.canvas.rect(this.screenSizeW / 2, this.screenSizeH / 2, this.screenSizeW, this.screenSizeH);

    this.canvas.noStroke();
    image(this.canvas, this.x, this.y, this.w, this.h);
  }
}
