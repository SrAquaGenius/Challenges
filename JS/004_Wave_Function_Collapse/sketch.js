/* ----------------------------------------------------------------------------
 * File:     sketch.js
 * Authors:  SrAqua
 * Modified: 2024-01-14 10:27
 * ------------------------------------------------------------------------- */

/* -------------------------------- Globals -------------------------------- */

const pageWidth = document.documentElement.clientWidth;;
const pageHeight = document.documentElement.clientHeight;

/* ------------------------------- Functions ------------------------------- */

function preload() {
	loadTiles();
}

function createCustomCanvas() {
	const canvasSize = pageHeight * 0.85;
	createCanvas(canvasSize, canvasSize);
}

function setup() {
	createCustomCanvas();
	createTiles();
	createGrid();
}


function checkValid(arr, valid) {
  
	for (let i = arr.length -1; i >= 0; i--) {
		let element = arr[i];
		if (!valid.includes(element))
			arr.splice(i, 1);
	}

}


function draw() {

	let gridCopy = grid.slice();

	// Stop drawing if there isn't more cell to collapse
	if (gridCopy.length == 0) {
		noLoop();
		return;
	}

	drawGrid();

	// Pick cells with last entropy
	gridCopy = gridCopy.filter((a) => !a.collapsed);
	gridCopy.sort((a, b) => {
		return a.options.length - b.options.length;
	});

	if (gridCopy.length == 0) {
		noLoop();
		return;
	}
	
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
	const pick = random(cell.options);

	if (pick === undefined) {
		createGrid();
		return;
	}

	cell.options = [pick];


	// Create new generation of tiles
	generateNewGrid(grid);
}
