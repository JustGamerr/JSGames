function drawHUD(canvas, p = player)
{
  canvas.fill(100);
  canvas.rect(250, 475, 500, 50);

  canvas.fill(0);
  canvas.textSize(32);
  canvas.textFont("Georgia");

  canvas.text("Speed: " + Math.sqrt(p.vx * p.vx + p.vy * p.vy).toFixed(1), 120, 480);

}
