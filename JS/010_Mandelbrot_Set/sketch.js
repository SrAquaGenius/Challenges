var minSlider;
var maxSlider;

var maxIteration = 100;

function setup() {
  createCanvas(500, 500);
  pixelDensity(1);

  minSlider = createSlider(-2.5, 0, -2.5, 0.01);
  maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      let a = map(x, 0, width, minSlider.value(), maxSlider.value());
      let b = map(y, 0, height, minSlider.value(), maxSlider.value());
      
      let ca = a;
      let cb = b;
      
      let n = 0;
      let z = 0;

      while (n < maxIteration)
      {
        let aa = a*a - b*b;
        let bb = 2 * a * b;
        
        a = aa + ca;
        b = bb + cb;

        if (abs(a + b) > 16) {
          break;
        }
        
        n++;
      }

      let bright = map(n, 0, maxIteration, 0, 255);
      if (n == maxIteration) {
        bright = 0;
      }
      
      let pix = (x + y * width) * 4;
      pixels[pix + 0] = bright;
      pixels[pix + 1] = bright;
      pixels[pix + 2] = bright;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
}