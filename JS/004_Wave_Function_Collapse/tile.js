/* ----------------------------------------------------------------------------
 * File:     tile.js
 * Authors:  SrAqua
 * Modified: 2024-01-14 10:26
 * ------------------------------------------------------------------------- */

/* -------------------------------- Globals -------------------------------- */

const N_TILES = 13;

const tiles = [];
const tilesImages = [];

/* ------------------------------- Tile class ------------------------------ */

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
      if (compareEdge(tile.edges[2], this.edges[0])) {
        this.up.push(i);
      }
      // Right
      if (compareEdge(tile.edges[3], this.edges[1])) {
        this.right.push(i);
      }
      // Down
      if (compareEdge(tile.edges[0], this.edges[2])) {
        this.down.push(i);
      }
      // Left
      if (compareEdge(tile.edges[1], this.edges[3])) {
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

/* ------------------------------- Functions ------------------------------- */

function reverseString(s) {
	let arr = s.split("");
	arr = arr.reverse();
	return arr.join("");
}

function compareEdge(a, b) {
	return a == reverseString(b);
}

function loadTiles() {

	const path = "circuit";
	for (let i = 0; i < N_TILES; i++)
		tilesImages[i] = loadImage(`${path}/${i}.png`);
}

function createTiles() {

	// Load and create the possible tiles
	// A - dark grey; B - dark green, C - light green, D - light grey
	tiles[0] = new Tile(tilesImages[0], ["AAA", "AAA", "AAA", "AAA"]);
	tiles[1] = new Tile(tilesImages[1], ["BBB", "BBB", "BBB", "BBB"]);
	tiles[2] = new Tile(tilesImages[2], ["BBB", "BCB", "BBB", "BBB"]);
	tiles[3] = new Tile(tilesImages[3], ["BBB", "BDB", "BBB", "BDB"]);
	tiles[4] = new Tile(tilesImages[4], ["ABB", "BCB", "BBA", "AAA"]);
	tiles[5] = new Tile(tilesImages[5], ["ABB", "BBB", "BBB", "BBA"]);
	tiles[6] = new Tile(tilesImages[6], ["BBB", "BCB", "BBB", "BCB"]);
	tiles[7] = new Tile(tilesImages[7], ["BDB", "BCB", "BDB", "BCB"]);
	tiles[8] = new Tile(tilesImages[8], ["BDB", "BBB", "BCB", "BBB"]);
	tiles[9] = new Tile(tilesImages[9], ["BCB", "BCB", "BBB", "BCB"]);
	tiles[10] = new Tile(tilesImages[10], ["BCB", "BCB", "BCB", "BCB"]);
	tiles[11] = new Tile(tilesImages[11], ["BCB", "BCB", "BBB", "BBB"]);
	tiles[12] = new Tile(tilesImages[12], ["BBB", "BCB", "BBB", "BCB"]);

	// Generate rotations (some of then may be redundant)
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
}
