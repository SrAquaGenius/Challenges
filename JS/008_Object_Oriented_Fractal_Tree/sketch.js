var tree = [];
var leaves = [];

var count = 0;

var start_len = 150;
var angle;
var down_scale = 0.67;

var slider;

function setup()
{
  createCanvas(500, 500);
  
  slider = createSlider(0, PI, PI/4, 0.001);

  let a = createVector(floor(width/2), height);
  let b = createVector(floor(width/2), height - start_len);
  var root = new Branch(a, b);

  angle = PI/6;

  tree[0] = root;
}

function mousePressed()
{
  for (let t = tree.length - 1; t >= 0; t--) {
    if (!tree[t].isFinished) {
      var newBranches = tree[t].branch(angle, down_scale);
      for (let b = 0; b < newBranches.length; b++) {
        tree.push(newBranches[b]);
      }
      tree[t].isFinished = true;
    }
  }
  count++;

  if (count === 5) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].isFinished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function draw()
{
  background(51);

  for (let t = 0; t < tree.length; t++) {
    tree[t].show();
    //tree[t].jitter();
  }

  for (let l = 0; l < leaves.length; l++) {
    fill(255, 0, 100, 100)
    noStroke();
    ellipse(leaves[l].x, leaves[l].y, 8, 8);
  }
}
