class Menu {
    constructor(title, pages, bc, tc){
        this.title = title;
        this.pages = pages;
        this.page = 0;
        this.color = bc || color(0, 0, 0);
        this.textColor = tc || color(255, 255, 255);
    }

    draw(){
        background(this.color);
        fill(this.textColor);
        textAlign(CENTER);
        textSize(64)
        text(this.title, 250,100)
        for(var button of this.pages[this.page]){
            button.draw();
            if(register[LEFT] && button.mouseCollide()){
                button.func();
                register[LEFT]=false
            }
        }
    }
}

class Button {
  constructor ( x, y, width, height, text, func, baseColor, highlightColor){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.action = action;
    this.baseColor = baseColor;
    this.highlightColor = highlightColor;
  }

  mouseCollide(){

    if (mouseX > this.x - this.width/2 &&
        mouseX < this.x + this.width/2 &&
        mouseY > this.y - this.height/2 &&
        mouseY < this.y + this.height/2){
          return true;
        }

    return false;

  }

  draw()  {

    if(this.mouseCollide()){
      fill (this.highlightColor);
    }
    else {
      fill (this.baseColor);
    }

    rect(this.x, this.y, this.width, this.height, this.height/10);

    fill (0);
    textSize (this.height/2);
    textAlign(CENTER)

    text (this.text, this.x, this.y + this.height / 6);

  }
}
