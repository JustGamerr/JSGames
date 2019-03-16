var player1 = {
  x: 10,
  y: 200,
  w: 15,
  h: 100,
  speed: 3,
  up: false,
  down: false
}

var player2 = {
  x: 475,
  y: 200,
  w: 15,
  h: 100,
  speed: 3,
  up: false,
  down: false
}

var draw = function(){
  background(0);
  halfLine();
  drawPlayers();

};

function halfLine() {
  for (var i = 0; i < 13; i++) {
    fill(255);
    rect(245, 40 * i, 10, 20);
  }
}

function drawPlayers() {
  fill(255, 0, 0);
  rect(player1.x, player1.y, player1.w, player1.h);

  fill(0, 128, 255);
  rect(player2.x, player2.y, player2.w, player2.h);
}
