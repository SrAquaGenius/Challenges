let pos;
let dir;
let bias = 1;
let path = [];

let pause = true;
let startButton;

function drawBackground() {
  background(skyColor);
  noStroke();
  rectMode(CORNER);
  fill(dirtColor);
  rect(0, 100, width, height-100);
  fill(waterColor);
  arc(width/2, 100, 400, 200, 0, PI);
}

function setup() {

  initColors();
  
  createCanvas(900, 600);
  pos = createVector(20, 100);
  dir = p5.Vector.fromAngle(PI / 6);


  // Create a button to pause the game
  startButton = createButton("Start");
  startButton.mousePressed(function () {
    if (startButton.elt.innerText === "Start") {
      startButton.elt.innerText = "Pause";
    }

    pause = !pause;
  })

  // Creates a button to change the bias
  createButton("Toggle Bias").mousePressed(function () {
    bias *= -1;
  });

  drawBackground();
}

function drill() {

  const angle = 0.01;
  dir.rotate(angle * bias);
  
  path.push(pos.copy());
  pos.add(dir);

}

function draw() {

  // If the game is paused, dont do anything
  if (pause) {
    return;
  }
  
  // Drill
  drill();

  // Draw the background
  drawBackground();
  
  // Create the path
  beginShape();
  noFill();
  stroke(0);
  strokeWeight(2);
  for (let v of path) {
    vertex(v.x, v.y);
  }
  endShape();
  
  // The drill
  stroke(255, 220, 100);
  strokeWeight(8);
  push();
  translate(pos.x, pos.y);
  rotate(dir.heading() + (PI/6)*bias);
  line(0, 0, 10, 0);
  pop();
}