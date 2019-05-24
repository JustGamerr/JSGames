var register = {};

function keyPressed()
{
  register[keyCode] = true;
}

function keyReleased()
{
  register[keyCode] = false;
}

function mousePressed()
{
  register[mouseButton] = true;
}

function mouseReleased()
{
  register[mouseButton] = false;
}

window.addEventListener('contextmenu', event => event.preventDefault());
