function drawHUD(canvas, p = player) {
  canvas.fill(100);
  canvas.rect(250, 475, 500, 50);

  canvas.fill(0);
  canvas.textSize(32);
  canvas.textFont("Georgia");
  canvas.text(p.place + "/" + players.length, 15, 480);

  canvas.text("Speed: " + Math.sqrt(p.velocityX * p.velocityX + p.velocityY * p.velocityY).toFixed(1), 120, 480);

  canvas.text("W: Blaster", 300, 480);
}
