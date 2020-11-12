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

function playerReset() {
  const pieces = "TJLOSZI";
  player.matrix = createPiece(
    pieces[Math.floor(pieces.length * Math.random())]
  );
  player.pos.y = 0;
  player.pos.x = 0;
  // if (collide(arena, player)) {
  //   arena.forEach(row => row.fill(0));
  //   player.score = 0;
  //   updateScore();
  // }
}

function createPiece(type) {
  if (type === "I") {
    return [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
    ];
  } else if (type === "L") {
    return [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2],
    ];
  } else if (type === "J") {
    return [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0],
    ];
  } else if (type === "O") {
    return [
      [4, 4],
      [4, 4],
    ];
  } else if (type === "Z") {
    return [
      [5, 5, 0],
      [0, 5, 5],
      [0, 0, 0],
    ];
  } else if (type === "S") {
    return [
      [0, 6, 6],
      [6, 6, 0],
      [0, 0, 0],
    ];
  } else if (type === "T") {
    return [
      [0, 7, 0],
      [7, 7, 7],
      [0, 0, 0],
    ];
  }
}

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
    playerReset();
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
