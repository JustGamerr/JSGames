var register = {}

function keyPressed()
{
  register[keyCode] = true
}

function keyReleased()
{
  register[keyCode] = false
}

window.addEventListener('contextmenu', event => event.preventDefault())
