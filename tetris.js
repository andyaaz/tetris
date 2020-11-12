const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];
const sideLength = 20;
// one second
const dropInterval = 1000;

let dropTimer = 0;
let player = { pos: { x: 0, y: 0 }, matrix };
const arena = createMatrix(20, 20);

function createMatrix(w, h) {
  return Array(h).fill(Array(w).fill(0));
}

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

function playerMove(offset) {
  player.pos.x += offset * sideLength;
  // if (collide(arena, player)) {
  //   player.pos.x -= offset;
  // }
}

function playerDrop() {
  player.pos.y += sideLength;
  // if (collide(arena, player)) {
  //   player.pos.y--;
  //   merge(arena, player);
  //   playerReset();
  //   arenaSweep();
  //   updateScore();
  // }
  // dropCounter = 0;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    playerMove(-1);
  } else if (keyCode === RIGHT_ARROW) {
    playerMove(1);
  } else if (keyCode === DOWN_ARROW) {
    playerDrop();
  }
}

function keyTyped() {
  if (key === "q") {
    console.log("rotate anti clockwise");
  } else if (key === "w") {
    console.log("rotate clockwise");
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);
  // dropTimer += deltaTime;
  // if (dropTimer > dropInterval) {
  //   player.pos.y += sideLength;
  //   dropTimer = 0;
  // }
  drawMatrix(matrix, player.pos);
}
