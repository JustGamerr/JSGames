function drawHUD(canvas, p)
{
  canvas.fill(100)
  canvas.rect(250, 475, 500, 50);

  canvas.fill(0);
  canvas.textSize(32);
  canvas.textFont("Comic Sans")

  canvas.text("Speed: " + Math.sqrt(p.vx * p.vx + p.vy * p.vy).toFixed(1), 50, 480);
  canvas.text("Health: " + p.health, 200, 480);
}
