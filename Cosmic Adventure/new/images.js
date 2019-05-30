var bkgImg;
var p1Img;
var p1IdleImg;
var p1FlameImg;
var p1MovingImg;
var p2Img;
var p2IdleImg;
var p2FlameImg;
var p2MovingImg;
var shipImages = [];

function preload(){
  bkgImage = loadImage("http://cosmicadventure.xyz/game/resources/bkgImage.jpg");

  p1Img = loadImage("http://cosmicadventure.xyz/game/resources/p1full.gif");
  p1IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p1idle.png");
  p1FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p1fullflame.png");
  p1MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p1moving.gif");

  p2Img = loadImage("http://cosmicadventure.xyz/game/resources/p2full.gif");
  p2IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p2idle.png");
  p2FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p2fullflame.png");
  p2MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p2moving.gif");

  shipImages = [p1Img, p1IdleImg, p1FlameImg, p1MovingImg, p2Img, p2IdleImg, p2FlameImg, p2MovingImg];
}
