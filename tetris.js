const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

let player = { pos: { x: 5, y: 5 }, matrix };
const width = 20;

function drawMatrix(matrix, offset) {
  matrix.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== 0) {
        fill("green");
        rect(colIdx * width + offset.x, rowIdx * width + offset.y, 20, 20);
      }
    });
  });
}

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  drawMatrix(matrix, player.pos);
}
