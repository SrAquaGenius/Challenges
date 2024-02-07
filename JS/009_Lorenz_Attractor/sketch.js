let zoom = 4;
let angleX = 0;
let angleY = 0;

let x = 0.01;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 2.67;

let points = [];

function setup()
{
  createCanvas(500, 500, WEBGL);
  colorMode(HSB);
}

function mouseDragged()
{
  // Calculate rotation angles based on mouse movement
  let dx = mouseX - pmouseX;
  let dy = mouseY - pmouseY;
  angleY += dx * 0.01;
  angleX -= dy * 0.01;
}

function mouseWheel(event)
{
  // Adjust zoom based on mouse wheel movement
  let delta = event.delta;
  zoom += delta * 0.01; // You can adjust the zoom speed here
  zoom = constrain(zoom, 1, 10); // Limit the zoom range
  return false; // Prevent the page from scrolling
}

function draw()
{  
  background(0);

   // Apply user-controlled rotation to the graph
  scale(zoom);
  rotateX(angleX);
  rotateY(angleY);

  let dt = 0.01;
  let dx = (a * (y - x)) * dt;
  let dy = (x * (b - z) - y) * dt;  
  let dz = (x * y - c * z) * dt;

  x = round((x + dx) * 10000) / 10000;
  y = round((y + dy) * 10000) / 10000;
  z = round((z + dz) * 10000) / 10000;

  points.push(createVector(x, y, z));

  scale(4);
  stroke(255);
  noFill();
  
  let hu = 0;
  beginShape();
  for (let v = 0; v < points.length; v++) {
    let p = points[v];
    stroke(hu, 255, 255);
    vertex(p.x, p.y, p.z);
    hu += 0.5;
    if (hu > 360)
      hu = 0;
  }
  endShape();
  
  
  //console.log(x, y, z);
}
