class Branch
{
  constructor(start, end)
  {
    this.start = start;
    this.end = end;
    this.isFinished = false;
  }

  show()
  {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  branch(angle, d_scale)
  {
    var branches = [];

    var dir = p5.Vector.sub(this.end, this.start);
    dir.rotate(angle);
    dir.mult(d_scale);

    var newRightEnd = p5.Vector.add(this.end, dir);
    branches.push(new Branch(this.end, newRightEnd));

    dir.rotate(- angle * 2);
    var newLeftEnd = p5.Vector.add(this.end, dir);
    branches.push(new Branch(this.end, newLeftEnd));

    return branches;
  }

  jitter()
  {
    this.end.x += random(-1, 1);
    this.end.y += random(-1, 1);
  }
}