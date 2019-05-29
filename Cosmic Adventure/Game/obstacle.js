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

var rotatedRectangularCollision = function(obj1, obj2)
{
  let o1c = findCorners(obj1);

  let o2c = findCorners(obj2);
  //console.log(obj2)
  //console.log(o2c);
  //1) find the two axis per rectangle which are perpendicular to their sides
  // use [c1.x-c2.x, c1.y,c2.y] and [c2.x-c3.x, c2.y-c3.y] for each
  let axis =[     {x:o1c[0].x - o1c[1].x, y:o1c[0].y - o1c[1].y},
                  {x:o1c[1].x - o1c[2].x, y:o1c[1].y - o1c[2].y},
                  {x:o2c[0].x - o2c[1].x, y:o2c[0].y - o2c[1].y},
                  {x:o2c[1].x - o2c[2].x, y:o2c[1].y - o2c[2].y},]

  // 2-4 for each axis
  for (var a of axis){
      // stroke(255,0,0);
      // line(player.x, player.y, player.x+a.x, player.y+a.y)
      // stroke(0);
      //2) project each corner onto the axis using (  (c.x*a.x + c.y*a.y)/ (a.x^2 +a.y^2)  )* a.x for x component
      //  (  (c.x*a.x + c.y*a.y)/ (a.x^2 +a.y^2)  )* a.y for y component
      let pc1 = [];
      for (var c of o1c){
          pc1.push({x:((c.x * a.x + c.y * a.y) / (a.x * a.x + a.y * a.y)) * a.x, y:((c.x * a.x + c.y * a.y) / (a.x * a.x + a.y * a.y)) * a.y });
      }

      let pc2 = [];
      for (var c of o2c){
          pc2.push({x:((c.x * a.x + c.y * a.y) / (a.x * a.x +a.y * a.y)) * a.x, y:((c.x * a.x + c.y * a.y) / (a.x * a.x + a.y * a.y)) * a.y });
      }

      //3) evaluate their place along the axis using the dot product (PROJc.x*a.x + PROJc.y*a.y)
      let dot1 = [];
      for(var c of pc1){
          dot1.push(c.x * a.x + c.y * a.y);
      }

      let dot2 = [];
      for(var c2 of pc2){
          dot2.push(c2.x * a.x + c2.y * a.y);
      }

      //4) compare least and greatest values for each rect similar to normal collision
      dot1.sort(function(a, b){return a - b})
      dot2.sort(function(a, b){return a - b})

      if(dot1[0] < dot2[3] && dot1[3] > dot2[0]){
          // successful check: continue
      } else {
          return false;
      }

  }
  //5) return true if successful for all four vectors
  return true;
}
