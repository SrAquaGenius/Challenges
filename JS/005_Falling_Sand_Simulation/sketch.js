let grid;
let w = 5;
let cols, rows;
let hueValue = 200;

function withinCols(i)
{
  return i >= 0 && i <= cols - 1;  
}

function withinRows(j)
{
  return j >= 0 && j <= rows - 1;
}

function make2DArray(cols, rows)
{
  let arr = new Array(cols);
  for (let i = 0; i < rows; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}

function setup()
{
  createCanvas(550, 550);
  colorMode(HSB, 360, 255, 255);
  cols = width / w;
  rows = height / w;
  grid = make2DArray(cols, rows);
}

function mouseDragged()
{
  let mouseCol = floor(mouseX / w);
  let mouseRow = floor(mouseY / w);
  
  let matrix = 5;
  let extent = floor(matrix/2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinCols(col) && withinRows(row)) {
          grid[col][row] = hueValue;
        }
      }
    }
  }
  hueValue += 0.5;
  if (hueValue === 360) {
    hueValue = 0;
  }
}

function draw()
{
  background(0);
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      noStroke();
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
        let x = i * w;
        let y = j * w;
        square(x, y, w);
      }
    }
  }

  let nextGrid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      if (state > 0) {

        let below = grid[i][j+1];

        let dir = random([-1,1]);        
        let belowA = -1;
        let belowB = -1;

        if (withinCols(i + dir)) {
          belowA = grid[i+dir][j+1];
        }
        if (withinCols(i - dir)) {
          belowB = grid[i-dir][j+i];
        }
        
        if (below === 0) {
          nextGrid[i][j+1] = state;
        } else if (belowA === 0) {
          nextGrid[i + dir][j + 1] = state;
        } else if (belowB === 0) {
          nextGrid[i - dir][j+1] = state;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
  }
  grid = nextGrid;
}
