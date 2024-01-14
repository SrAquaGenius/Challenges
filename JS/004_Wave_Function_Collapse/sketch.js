const DIM = 20;
const N_TILES = 13;

const tiles = [];
const tilesImages = [];

let grid = [];


function preload() {
  const path = "circuit";
  for (let i = 0; i < N_TILES; i++) {
    tilesImages[i] = loadImage(`${path}/${i}.png`);
  }
}

function setup() {
  createCanvas(550, 550);

  // Load and create the possible tiles
  tiles[0] = new Tile(tilesImages[0], [0, 0, 0, 0]);
  tiles[1] = new Tile(tilesImages[1], [1, 1, 1, 1]);
  tiles[2] = new Tile(tilesImages[2], [1, 2, 1, 1]);
  tiles[3] = new Tile(tilesImages[3], [1, 3, 1, 3]);
  tiles[4] = new Tile(tilesImages[4], [1, 2, 1, 2]);
  tiles[5] = new Tile(tilesImages[5], [3, 2, 3, 2]);
  tiles[6] = new Tile(tilesImages[6], [3, 1, 2, 1]);
  tiles[7] = new Tile(tilesImages[7], [2, 2, 1, 2]);
  tiles[8] = new Tile(tilesImages[8], [2, 2, 2, 2]);
  tiles[9] = new Tile(tilesImages[9], [2, 2, 1, 1]);
  tiles[9] = new Tile(tilesImages[9], [1, 2, 1, 2]);

  for (let i = 2; i < N_TILES; i++) {
    for (let j = 0; j < 4; j ++) {
      tiles.push(tiles[i].rotate(j));
    }
  }

  // Generate the adjacency rules based on edges
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    tile.analyze(tiles);
  }

  // Create a cell for each stop in the grid
  for (let i = 0; i < DIM * DIM; i++) {
    grid[i] = new Cell(tiles.length);
  }
}


function checkValid(arr, valid) {
  
  for (let i = arr.length -1; i >= 0; i--) {
    let element = arr[i];
    if (!valid.includes(element)) {
      arr.splice(i, 1);
    }
  }

}


function generateNewGrid(arr) {
  const newGrid = [];
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {

      let index = i + j * DIM;
      if (grid[index].collapsed) {
        newGrid[index] = grid[index];
      }

      else {

        let options = new Array(tiles.length).fill(0).map((_, i) => i);

        // Look up
        if (j > 0) {
          let up = grid[i + (j-1) * DIM];
          let validOptions = [];
          for (let option of up.options) {
            let valid = tiles[option].down;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        // Look right
        if (i < DIM - 1) {
          let right = grid[i + 1 + j * DIM];
          let validOptions = [];
          for (let option of right.options) {
            let valid = tiles[option].left;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        
        // Look down
        if (j < DIM - 1) {
          let down = grid[i + (j+1) * DIM];
          let validOptions = [];
          for (let option of down.options) {
            let valid = tiles[option].up;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }
        
        // Look left
        if (i > 0) {
          let left = grid[i - 1 + j * DIM];
          let validOptions = [];
          for (let option of left.options) {
            let valid = tiles[option].right;
            validOptions = validOptions.concat(valid);
          }
          checkValid(options, validOptions);
        }

        newGrid[index] = new Cell(options);
      }
    }
  }
  grid = newGrid;
}


function draw() {
  
  let gridCopy = grid.slice();
  const w = width / DIM;
  const h = height / DIM;
  

  // Stop drawing if there isn't more cell to collapse
  if (gridCopy.length == 0) {
    noLoop();
    return;
  }
  

  // Draw cells  
  for (let j = 0; j < DIM; j++) {
    for (let i = 0; i < DIM; i++) {

      let cell = grid[i + j * DIM];

      if (cell.collapsed) {
        let index = cell.options[0];
        image(tiles[index].img, i * w, j * h, w, h);
      }
      else {
        fill(0);
        rect(i * w, j * h, w, h);
      }
    }
  }

  

  // Pick cells with last entropy
  gridCopy = gridCopy.filter((a) => !a.collapsed);
  gridCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });
  
  let len = gridCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 0; i < gridCopy.length; i++) {
    if (gridCopy[i].options.length > len) {
      stopIndex = i;
      break;
    }
  }
  
  if (stopIndex > 0) gridCopy.splice(stopIndex);

  // Pick one randomly
  const cell = random(gridCopy);
  cell.collapsed = true;
  const type = random(cell.options);
  cell.options = [type];


  // Create new generation of tiles
  generateNewGrid(grid);
}
