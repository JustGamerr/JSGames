var lightning = function(x, y, width, height, strokeColor= color(0)) {
  noStroke();
  quad(x - width / 2 - 3, y + height / 20, x + 3, y + height / 20, x + width / 2 + 3, y - height / 20, x - 3, y - height / 20);
  triangle(x - width / 2, y + height / 20, x, y - height / 20, x + width / 2, y - 50);
  triangle(x + width / 2, y - height / 20, x, y + height / 20, x - width / 2, y + 50);

  if(strokeColor) {
    stroke(strokeColor);
    line(x - width / 2, y + height / 20, x, y + height / 20);
    line(x, y + height / 20, x - width / 2, y + height / 2);
    line(x - width / 2, y + height / 2, x + width / 2, y - height / 20);
    line(x + width / 2, y - height / 20, x, y - height / 20);
    line(x, y - height / 20, x + width / 2, y - height / 2);
    line(x + width / 2, y - height / 2, x - width/2, y + height / 20)
  }
}

lightning(10, 100, 50, 200);

lightning(200, 300, 200, 50);
