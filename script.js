var context;
var radius = 10;
var numPoints = 12;
var points = [];
var width;
var height;

function Point(){

    // random x and y
    this.x = Math.floor(Math.random()*(width));
    this.y = Math.floor(Math.random()*(height));
 
    // random direction, +1 or -1
    this.dx = Math.floor(Math.random()*2) * 2 - 1;
    this.dy = Math.floor(Math.random()*2) * 2 - 1;
 
}
 
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
}

function init()
{
  context= canvas.getContext('2d');
  resizeCanvas();

  // create an array of balls
  for(i= 0 ; i < numPoints ; i++){
    points.push(new Point());
  }

  setInterval(draw, 10);
}

function drawTriangs() {
  
    for (i = 0; i < numPoints; i++) {
        var point = points[i];

        if( point.x<0 || point.x>width) point.dx=-point.dx; 
        if( point.y<0 || point.y>height) point.dy=-point.dy; 

        point.x+=point.dx;
        point.y+=point.dy;
    }
  
  var vertices = points.map(function(d) {
    return [d.x, d.y];
  });
  
  var voronoi = d3.geom.voronoi(vertices);
  
  for (i = 0; i < voronoi.length; i++) {
    
    var poly = voronoi[i];
    
    context.beginPath();
    context.strokeStyle="#fff";

    context.moveTo(poly[0][0],poly[0][1]);
    
    for (j = 1; j < poly.length; j++) {
      context.lineTo(poly[j][0],poly[j][1]);
    }
    
    context.closePath();
    context.stroke();
  }
  
}


function draw()
{
    context.clearRect(0,0, width,height);
    drawTriangs();
}

document.addEventListener('DOMContentLoaded', init);


 // resize the canvas to fill browser window dynamically
window.addEventListener('resize', resizeCanvas, false);