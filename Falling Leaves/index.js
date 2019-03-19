var leaves = [];
var bottom=500;
var maxSpeed = 10;
var pileUp=.1;
var intensity=2;
var treeImg;
var leafSize = 25;

var setup = function(){
  createCanvas(500, 500);
  noStroke();
  treeImg = loadImage("tree.jpg")
  leaves=[];
  while(leaves.length<1000){

    leaves.push({x:random(0,500), y:random(0,-20000/intensity), width:random(leafSize*0.4,leafSize), height:random(leafSize*0.2,leafSize), speed:random(maxSpeed*0.25,maxSpeed), xSpd:random(-4,4), col: color(random(100,255),random(100,255),0)});
  }
};

var draw = function(){
  image(treeImg,0,0,500,500)
  leaves.forEach(function(leaf){
    leaf.y += leaf.speed;
    leaf.x += leaf.xSpd;
    fill(leaf.col);
    ellipse(leaf.x,leaf.y,leaf.width,leaf.height);
    if(leaf.y>bottom&& leaf.speed>0){
      leaf.speed=0;
      leaf.xSpd=0;
      leaf.y=bottom;
      bottom-=pileUp;
    }
    if(leaf.x>500 || leaf.x<0){
      leaf.xSpd *=-1;
    }
  });
  if(bottom<500.1-leaves.length*pileUp){
    bottom=500;
    setup();
  }
};
