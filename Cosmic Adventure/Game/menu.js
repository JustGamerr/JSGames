class Menu
{
  constructor(text, pages, bc, tc)
  {
    this.text = text;
    this.pages = pages;
    this.page = 0;
    this.backgroundColor = bc || color(0, 0, 0);
    this.textColor = tc || color(0, 191, 255);

  }
  draw()
  {
    background(this.backgroundColor);
    fill(this.textColor);
    textAlign(CENTER);
    textSize(56);
    text(this.text, 250, 75);
    for(var button of this.pages[this.page])
    {
      button.draw();
      if(register[LEFT] && button.mouseCollide())
      {
        button.func();
        register[LEFT] = false;
      }
    }
  }
}

class Button
{
  constructor(x, y, w, h, text, action, color, hoverColor)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.action = action;
    this.color = color;
    this.hoverColor = hoverColor;
  }

  mouseCollide()
  {
    if(mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2
      && mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2)
    {
      return true;
    }

    return false;
  }

  draw()
  {
    if(this.mouseCollide()) {
      fill(this.hoverColor)
    } else {
      fill(this.color)
    }

    rect(this.x, this.y, this.w, this.h, this.h / 10)
    fill(0)
    textSize(this.h / 2)
    textAlign(CENTER)
    text(this.text, this.x, this.y + this.h / 6)
  }

}
