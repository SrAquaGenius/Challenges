class Cell {
  constructor(i, j, w)
  {
    this.i = i;
    this.j = j;
    this.x = i*w;
    this.y = j*w;
    this.w = w;
    this.isBomb = false;
    this.isRevealed = false;
    this.neighborCount = 0;
  }

  show()
  {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.isRevealed) {
      if (this.isBomb) {
        fill(127);
        ellipse(this.x + this.w/2, this.y + this.w/2, this.w/2)
      }
      else {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          fill(0);
          textSize(26);
          textAlign(CENTER, CENTER);
          text(this.neighborCount, this.x + this.w/2, this.y + this.w/2);
        }
      }
    }
  }

  contains(x, y)
  {
    return this.x < x && x < this.x + this.w && this.y < y && y < this.y + this.w;
  }

  reveal()
  {
    this.isRevealed = true;
  }

  setCount(num) {
    this.neighborCount = num;
  }
}