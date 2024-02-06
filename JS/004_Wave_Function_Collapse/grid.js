/* ----------------------------------------------------------------------------
 * File:     grid.js
 * Authors:  SrAqua
 * Modified: 2024-01-14 10:27
 * ------------------------------------------------------------------------- */

/* -------------------------------- Globals -------------------------------- */

const DIM = 25;

let grid = [];

/* ------------------------------- Cell class ------------------------------ */

class Cell {

	constructor(value) {

		this.collapsed = false;
		
		if (value instanceof Array)	this.options = value;
		else this.options = new Array(value).fill(0).map((_, i) => i);
	}
}

/* ------------------------------- Functions ------------------------------- */
function createGrid() {

	// Create a cell for each spot in the grid
	for (let i = 0; i < DIM * DIM; i++) 
		grid[i] = new Cell(tiles.length);

}

function drawGrid() {
	const w = width / DIM;
	const h = height / DIM;

	for (let j = 0; j < DIM; j++) {
		for (let i = 0; i < DIM; i++) {

			let cell = grid[i + j * DIM];

			if (cell.collapsed) {
				let index = cell.options[0];
				image(tiles[index].img, i * w, j * h, w, h);
				continue;
			}

			fill(0);
			rect(i * w, j * h, w, h);
		}
	}
}

function generateNewGrid() {
	const newGrid = [];
	for (let j = 0; j < DIM; j++) {
		for (let i = 0; i < DIM; i++) {

			let index = i + j * DIM;
			if (grid[index].collapsed) {
				newGrid[index] = grid[index];
				continue;
			}

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
	grid = newGrid;
}
