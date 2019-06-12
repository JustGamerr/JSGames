var gameMusic;
var gameMusic2;
var gameMusic3;
var gameMusic4;
var gameMusic5;
var gameMusic6;
var gameMusic7;
var gameMusic8;
var bkgImage;
var p1Img;
var p1IdleImg;
var p1FlameImg;
var p1MovingImg;
var p2Img;
var p2IdleImg;
var p2FlameImg;
var p2MovingImg;
var aiImg;
var gameSongs = [];
var songNames = [];

function preload()
{

  gameMusic = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic.mp3");
  gameMusic2 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic2.mp3");
  gameMusic3 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic3.mp3");
  gameMusic4 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic4.mp3");
  gameMusic5 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic5.mp3");
  gameMusic6 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic6.mp3");
  gameMusic7 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic7.mp3");
  gameMusic8 = loadSound("http://cosmicadventure.xyz/game/resources/gamemusic8.mp3");

  gameSongs = [gameMusic, gameMusic2, gameMusic3, gameMusic4, gameMusic5, gameMusic6, gameMusic7, gameMusic8];
  songNames = [];

  bkgImage = loadImage("http://cosmicadventure.xyz/game/resources/bkgImage.jpg");

  p1Sheet = loadImage("http://cosmicadventure.xyz/game/resources/p1fullsheet.png");
  p1Img = loadImage("http://cosmicadventure.xyz/game/resources/p1full.gif");
  p1IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p1idle.png");
  p1FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p1fullflame.png");
  p1MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p1moving.gif");

  p2Img = loadImage("http://cosmicadventure.xyz/game/resources/p2full.gif");
  p2IdleImg = loadImage("http://cosmicadventure.xyz/game/resources/p2idle.png");
  p2FlameImg = loadImage("http://cosmicadventure.xyz/game/resources/p2fullflame.png");
  p2MovingImg = loadImage("http://cosmicadventure.xyz/game/resources/p2moving.gif");

  aiImg = loadImage("http://cosmicadventure.xyz/game/resources/llama.gif");
}
