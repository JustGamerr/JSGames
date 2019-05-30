function drawHUD(canvas, player)
{
    canvas.fill(100)
    canvas.rect(250, 475, 500, 50);

    canvas.fill(0);
    canvas.textSize(32);
    canvas.textFont("Comic Sans")
    canvas.text(player.place + "/" + players.length, 15, 480);

    canvas.text("Speed: " + Math.sqrt(player.vx * player.vx + player.vy * player.vy).toFixed(1), 120, 480);
    canvas.text("Health: " + player.health, 300, 480)
}
