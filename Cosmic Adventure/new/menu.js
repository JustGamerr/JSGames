class Menu
{
    constructor(title, pages, backgroundColor, textColor)
    {
        this.title = title;
        this.pages = pages;
        this.page = 0;
        this.color = backgroundColor || color(0, 0, 0);
        this.textColor = textColor || color(255, 255, 255);
    }
    draw()
    {
        background(this.color);
        fill(this.textColor);
        textAlign(CENTER);
        textSize(64)
        text(this.title, 250, 100)
        for(var button of this.pages[this.page])
        {
            button.draw();
            if(register[LEFT] && button.mouseCollide())
            {
                button.action();
                register[LEFT] = false;
            }
        }
    }
}

class Button
{
  constructor (x, y, width, height, text, action, color, hoverColor)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.action = action;
    this.color = color;
    this.hoverColor = hoverColor;
  }

  mouseCollide()
  {

    if(mouseX > this.x - this.width / 2 &&
        mouseX < this.x + this.width / 2 &&
        mouseY > this.y - this.height / 2 &&
        mouseY < this.y + this.height / 2)
        {
          return true;
        }
    return false;
  }

  draw()
  {
    if(this.mouseCollide())
    {
      fill(this.hoverColor);
    }
    else
    {
      fill(this.baseColor);
    }
    rect(this.x, this.y, this.width, this.height, this.height / 10);

    fill (0);
    textSize (this.height / 2);
    textAlign(CENTER);

    var xAdjust = 0;
    var yAdjust = this.height / 6;
    text (this.text, this.x + xAdjust, this.y + yAdjust);
  }
}
