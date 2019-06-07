class Menu
{
  constructor(text, pages, useColor, backgroundColor, textColor)
  {
    this.text = text;
    this.pages = pages;
    this.page = 0;
    this.useColor = useColor;
    this.color = backgroundColor || color(0, 0, 0);
    this.textColor = textColor || color(0, 191, 255);
    this.objectsNum = 0;
  }
  draw()
  {
    if(this.useColor)
      background(this.color);

    fill(this.textColor);
    textAlign(CENTER);
    textSize(64);
    text(this.text, 375, 150);

    for(var button of this.pages[this.page])
    {
      if(button.text == "Exit to Main Menu" || button.text == "Return to Game")
      {
        button.draw();
        if(register[LEFT] && button.mouseCollide())
        {
          button.action();
          register[LEFT] = false;
          continue;
        }
      }

      if(button.text == "1" || button.text == "2" || button.text == "5" || button.text == "10")
      {
        button.draw();
        if(register[LEFT] && button.mouseCollide())
        {
          button.action();
          register[LEFT] = false;
          continue;
        }
      }

      if(button.text == "Version: 1.5.2")
      {
        button.draw();
        continue;
      }
      if(menu.page > 1)
      {
        if(button.text != "Back to Main Menu")
        {
          button.draw();
          continue;
        } else {
          button.draw();
          if(register[LEFT] && button.mouseCollide())
          {
            button.action();
            register[LEFT] = false;
            continue;
          }
        }
      }


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
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height, this.height / 10);

    fill(0);
    textSize(this.height / 2);
    textAlign(CENTER);

    text(this.text, this.x, this.y + this.height / 6);
  }
}

class ImageGraphic
{
  constructor(image, x, y, width, height)
  {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw()
  {
    image(this.image, this.x, this.y, this.width, this.height);
  }
}

class Text
{
  constructor(x, y, size, color, text)
  {
    this.x = x;
    this.y = y;

    this.textSize = size;
    this.textColor = color;
    this.text = text;
  }

  draw()
  {
  //  if(this.display)
  //  {
      fill(this.textColor);
      textSize(this.textSize);
      textAlign(CENTER);
      text(this.text, this.x, this.y);
  //  }
  }
}
