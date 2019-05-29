function drawHUD(c, p = player){
    c.fill(100)
    c.rect(250,475,500,50);

    //position
    c.fill(0);
    c.textSize(32);
    c.textFont("Georgia")
    c.text(p.place + "/"+players.length, 15,480);

    //speed
    c.text("Speed: "+ Math.sqrt(p.vx*p.vx+p.vy*p.vy).toFixed(1), 120, 480);

    //weapon
    c.text("W: Blaster",300,480)
}