const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];
const sideLength = 20;
// one second
const dropInterval = 1000;

let dropTimer = 0;
let player = { pos: { x: 5, y: 5 }, matrix };

function drawMatrix(matrix, offset) {
  matrix.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== 0) {
        fill("green");
        rect(
          colIdx * sideLength + offset.x,
          rowIdx * sideLength + offset.y,
          20,
          20
        );
      }
    });
  });
}

function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(0);
  dropTimer += deltaTime;
  if (dropTimer > dropInterval) {
    player.pos.y += sideLength;
    dropTimer = 0;
  }
  drawMatrix(matrix, player.pos);
}
