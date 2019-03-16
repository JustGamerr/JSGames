var star = function(x, y, size, strokeColor = color(0)) {
  noStroke();
  triangle(x + size / 2, y + size / 4, x - size / 2, y + size / 4, x, y - size / 2);
  triangle(x + size / 2, y - size / 4, x - size / 2, y - size / 4, x, y + size / 2);

  if(strokeColor) {
    stroke(strokeColor);
    line(x + size * 0.332, y, x+size / 2, y + size / 4);
    line(x + size * 0.332, y, x+size / 2, y - size / 4);
    line(x - size * 0.332, y, x-size / 2, y + size / 4);
    line(x - size * 0.332, y, x-size / 2, y - size / 4);

    line(x + size * 0.164, y + size / 4, x, y + size / 2);
    line(x - size * 0.164, y + size / 4, x, y + size / 2);
    line(x + size * 0.164, y - size / 4, x, y - size / 2);
    line(x - size * 0.164, y - size / 4, x, y - size / 2);

    line(x + size * 0.164, y + size / 4, x + size / 2, y + size / 4);
    line(x - size * 0.164, y + size / 4, x - size / 2, y + size / 4);
    line(x + size * 0.164, y - size / 4, x + size / 2, y - size / 4);
    line(x - size * 0.164, y - size / 4, x - size / 2, y - size / 4);
  }

};

fill(0, 255, 0)
star(250, 250, 500, color(0,0,255));

fill(255, 255, 0);
star(250, 250, 500, false);
