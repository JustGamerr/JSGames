class Obstacle
{
  constructor(x, y, w, h, direction = 0, size = 10)
  {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.direction = direction;
    this.size = size;
  }

  draw(c)
  {
    c.push()
      c.translate(this.x, this.y);
      c.rotate(this.direction);
      c.fill(200);
      c.rect(0, 0, this.w, this.h);
    c.pop();
  }
}

var findCorners = function(obj)
{
  let corners = [  {x:obj.x - obj.w*cos(obj.dir)/2 + obj.h*cos(obj.dir - PI/2)/2,   y:obj.y - obj.h*sin(PI/2 - obj.dir)/2 - obj.w*sin(obj.dir)/2},
                   {x:obj.x + obj.w*cos(obj.dir)/2 + obj.h*cos(obj.dir - PI/2)/2,   y:obj.y - obj.h*sin(PI/2 - obj.dir)/2 + obj.w*sin(obj.dir)/2},
                   {x:obj.x + obj.w*cos(obj.dir)/2 - obj.h*cos(obj.dir - PI/2)/2,   y:obj.y + obj.h*sin(PI/2 - obj.dir)/2 + obj.w*sin(obj.dir)/2},
                   {x:obj.x - obj.w*cos(obj.dir)/2 - obj.h*cos(obj.dir - PI/2)/2,   y:obj.y + obj.h*sin(PI/2 - obj.dir)/2 - obj.w*sin(obj.dir)/2}];

  return corners;
}
