var register = {};

function keyPressed(){
    register[keyCode] = true;
}

function keyReleased(){
    register[keyCode] = false;
}

function mousePressed(){
    register[mouseButton] = true;
}

function mouseReleased(){
    register[mouseButton] = false;
}


//Prevent arrow keys scrolling the page
window.addEventListener('contextmenu', event => event.preventDefault());