var heart = function(x, y, size, strokeColor = color(0)) {
  noStroke();
  ellipse(x - size*0.2, y, size/2, size/2);
  ellipse(x + size*0.2, y, size/2, size/2);
  ellipse(x, y + size*0.05, size/3, size/3);
  triangle(x - size*0.415, y + size/8, x + size*0.415, y + size/8, x, y + size*0.7);

  if(strokeColor) {
    stroke(strokeColor);
    arc(x-size*0.2, y, size/2, size/2, PI*5/6, PI*1.8);
    arc(x+size*0.2, y, size/2, size/2, PI*1.2, PI*13/6);
    line(x-size*0.415, y+size/8, x, y+size*0.7);
    line(x+size*0.415, y+size/8, x, y+size*0.7);
  }
}
fill(255, 0, 0)
heart(50, 50, 50);
