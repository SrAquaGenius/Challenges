class Grid {
  constructor(cols, rows, w)
  {
    this.cols = cols;
    this.rows = rows;

    this.grid = new Array(this.cols);

    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.rows);
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = new Cell(i, j, w);
      }
    }
  }

  generateBombs(number)
  {
    this.numBombs = number;

    var options = [];
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        options.push([i, j]);
      }
    }

    for (let n = 0; n < this.numBombs; n++) {
      let index = floor(random(options.length));
      let choice = options.splice(index, 1)[0];
      let cell = this.grid[choice[0]][choice[1]];
      cell.isBomb = true;
    }
  }

  show()
  {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        
        let cell = this.grid[i][j];
        this.testCellBomb(cell, i, j);
        cell.show();
      } 
    }
  }

  testCellBomb(cell, i, j)
  {
    if (cell.isBomb) { cell.setCount(-1); }
        
    else {
      let total = 0;

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (this.contains(i + x, j + y)) {
            let testCell = this.grid[i + x][j + y];
            if (testCell.isBomb) total++;
          }
        }
      }
      
      cell.setCount(total);
    }
  }

  floodFill(x, y)
  {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (this.contains(i + x, j + y)) {
          let cell = this.grid[i + x][j + y];
          
          if (!cell.isRevealed) {
             cell.reveal();

            if (cell.neighborCount == 0) {
              this.floodFill(i + x, j + y);
            }
          }         
        }
      }
    }
  }

  testMousePressed(x, y)
  {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let cell = this.grid[i][j];
        if (cell.contains(x, y)) {
          cell.reveal();
          
          if (cell.isBomb) {
            this.gameOver();
          }
          
          if (cell.neighborCount == 0) {
            this.floodFill(i, j);
          }
        }
      } 
    }
  }
  
  gameOver()
  {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.grid[i][j].reveal();
      } 
    }
  }

  contains(x, y) {
    return 0 <= x && x < this.cols && 0<= y && y < this.rows;
  }
}