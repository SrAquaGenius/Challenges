class Tile {
  constructor(img, edges) {
    this.img = img;
    this.edges = edges;

    this.up = [];
    this.right = [];
    this.down = [];
    this.left = [];
  }
  
  analyze(tiles) {
    for (let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      // Up
      if (tile.edges[2] == this.edges[0]) {
        this.up.push(i);
      }
      // Right
      if (tile.edges[3] == this.edges[1]) {
        this.right.push(i);
      }
      // Down
      if (tile.edges[0] == this.edges[2]) {
        this.down.push(i);
      }
      // Left
      if (tile.edges[1] == this.edges[3]) {
        this.left.push(i);
      }
    }
  }

  rotate(num) {
    const w = this.img.width;
    const h = this.img.height;

    // Rotate the image
    const newImg = createGraphics(w, h);
    newImg.imageMode(CENTER);
    newImg.translate(w / 2, h / 2);
    newImg.rotate(HALF_PI * num);
    newImg.image(this.img, 0, 0);

    // Rotate the edges
    const newEdges = [];
    const len = this.edges.length;
    for (let i = 0; i < len; i++) {
      newEdges[i] = this.edges[(i - num + len) % len]; 
    }

    // Create and return a new tile with the new configurations
    return new Tile(newImg, newEdges);
  }
}