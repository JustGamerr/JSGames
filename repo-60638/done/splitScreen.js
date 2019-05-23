class Screen{
    constructor(x,y,w,h,focus){
        this.x=x;
        this.y=y;
        this.w=w;
        this.h=h;
        this.focus=focus;
        this.canvas = createGraphics(500,500);
        this.canvas.rectMode(CENTER);
        this.canvas.imageMode(CENTER);
        this.canvas.background(0)
    }
    draw(){
        this.canvas.noFill(0);
        this.canvas.stroke(0);
        this.canvas.strokeWeight(20);
        this.canvas.rect(250,250,500,500);
        this.canvas.noStroke();
        image(this.canvas, this.x,this.y,this.w,this.h)
    }
}
class MiniMap extends Screen{
    constructor(x,y,w,h,focus,sizeX,sizeY){
        super(x,y,w,h,focus);
        this.canvas = createGraphics(sizeX,sizeY);
        this.canvas.rectMode(CENTER);
        this.canvas.imageMode(CENTER);
    }
    draw(){
        this.canvas.noFill(0);
        this.canvas.stroke(0);
        this.canvas.strokeWeight(20);
        this.canvas.rect(this.sizeX/2,this.sizeY/2,this.sizeX,this.sizeY);
        this.canvas.noStroke();
        image(this.canvas, this.x,this.y,this.w,this.h)
    }
}
