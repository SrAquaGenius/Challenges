var angle = 0;
var min_len = 4;
var reducing_scale = 0.67;
var start_len = 150;

var slider;

function setup() {
  createCanvas(500, 500);

  slider = createSlider(0, PI, PI/4, 0.001);
}

function draw() {
  background(51);
  
  angle = slider.value();

  let down_center = floor(width/2);
  translate(down_center, height);
  
  stroke(255);
  branch(start_len);
}

function branch(len) {
  line(0, 0, 0, - len);
  translate(0, -len);

  if (len > min_len) {
    push();
    rotate(angle);
    branch(len * reducing_scale);
    pop();
    push();
    rotate(-angle);
    branch(len * reducing_scale);
    pop();
  }
}