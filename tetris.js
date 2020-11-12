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
  return [...Array(w).keys()].map(() => new Array(h).fill(0));
}

function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        arena[y + player.pos.y / sideLength][
          x + player.pos.x / sideLength
        ] = value;
      }
    });
  });
}

function collide(arena, player) {
  const m = player.matrix;
  const p = player.pos;
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (
        m[y][x] !== 0 &&
        (arena[y + p.y / sideLength] &&
          arena[y + p.y / sideLength][x + p.x / sideLength]) !== 0
      ) {
        return true;
      }
    }
  }
  return false;
}

function drawMatrix(matrix, offset) {
  matrix.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== 0) {
        fill("green");
        rect(
          colIdx * sideLength + offset.x,
          rowIdx * sideLength + offset.y,
          sideLength,
          sideLength
        );
      }
    });
  });
}

function playerMove(offset) {
  player.pos.x += offset * sideLength;
  if (collide(arena, player)) {
    player.pos.x -= offset * sideLength;
  }
}

function playerDrop() {
  player.pos.y += sideLength;
  if (collide(arena, player)) {
    player.pos.y -= sideLength;
    merge(arena, player);
    // playerReset();
    // arenaSweep();
    // updateScore();
  }
  dropCounter = 0;
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
  dropTimer += deltaTime;
  if (dropTimer > dropInterval) {
    playerDrop();
    dropTimer = 0;
  }
  drawMatrix(arena, { x: 0, y: 0 });
  drawMatrix(player.matrix, player.pos);
}
