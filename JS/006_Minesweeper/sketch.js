let grid;
let numBombs = 10;

let canva_width = 500;
let canva_height = 500;
let w = 50;

function setup() {
  createCanvas(canva_width, canva_height);
  let cols = floor(canva_width / w);
  let rows = floor(canva_height / w);
  grid = new Grid(cols, rows, w);
  grid.generateBombs(numBombs);
}

function mousePressed()
{
  grid.testMousePressed(mouseX, mouseY);
}

function draw() {
  background(255);
  grid.show();
}