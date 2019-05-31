class Menu
{
  constructor(title, pages, backgroundColor, textColor)
  {
    this.title = title;
    this.pages = pages;
    this.page = 0;
    this.color = backgroundColor || color(0, 0, 0);
    this.textColor = textColor || color(0, 191, 255);
  }
  draw()
  {
    if(this.color != -1)
      background(this.color);

    fill(this.textColor);
    textAlign(CENTER);
    textSize(56);
    text(this.title, 250, 125);

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
      fill(this.color);
    }
    rect(this.x, this.y, this.width, this.height, this.height / 10);

    fill(0);
    textSize(this.height / 2);
    textAlign(CENTER);

    text(this.text, this.x, this.y + this.height / 6);
  }
}

// class Image
// {
//   constructor(x, y, width, height, image)
//   {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.image = image;
//     this.display = false;
//   }
//
//
//   draw()
//   {
//     if(this.display)
//     {
//       image(this.image, this.x, this.y, this.width, this.height);
//     }
//   }
// }
//
class Text
{
  constructor(x, y, size, color, text)
  {
    this.x = x;
    this.y = y;

    this.textSize = size;
    this.textColor = color;
    this.text = text;

    this.display = false;
  }

  draw()
  {
    if(this.display)
    {
      fill(this.textColor);
      textSize(this.size);
      textAlign(CENTER);
      text(this.text, this.x, this.y);
    }
  }
}
