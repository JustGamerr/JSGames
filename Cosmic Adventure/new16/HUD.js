function drawHUD(canvas, p)
{
  canvas.fill(100);
  canvas.rect(250, 475, 500, 50);

  canvas.fill(0);
  canvas.textSize(32);
  canvas.textFont("Comic Sans")

  if(players.length < 2) {
    canvas.text(p.place + "/" + players.length, 100, 480);
    canvas.text("Speed: " + Math.sqrt(p.vx * p.vx + p.vy * p.vy).toFixed(1), 250, 480);
    //canvas.text("Health: " + p.health, 300, 480);
  } else {
    canvas.text("Coins: " + p.coins, 30, 480);
    canvas.text("Speed: " + Math.sqrt(p.vx * p.vx + p.vy * p.vy).toFixed(1), 140, 480);
    canvas.text("Health: " + p.health, 320, 480);
  }
}
