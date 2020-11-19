const dropInterval = 1000;
const sideLength = 20;
const canvasWidth = 200;
const canvasHeight = 200;
const pieces = "TJLOSZI"; // 0-6
let dropTimer = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);

  // make tetrominoes drop every second
  dropTimer += deltaTime;
  if (dropTimer > dropInterval) {
    playerDrop();
    dropTimer = 0;
  }

  // draw player and arena
  drawMatrix(player.matrix, player.pos);
  drawMatrix(arena, { x: 0, y: 0 });
}

function arenaSweep() {
  // outer loop: iterate over each row (from the last row to the first row)
  outer: for (let y = arena.length - 1; y > 0; --y) {
    // innter loop: iterate over each item in a row
    for (x = 0; x < arena[y].length; ++x) {
      // if value is 0, skip this row and go to outer loop
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    // otherwise remove this row
    const removedRow = arena.splice(y, 1);

    // add a new row that consists of only 0s to the front of arena array
    const newRow = removedRow.fill(0);
    arena.unshift(newRow);
    ++y;
  }
}

// type: 'I', 'L', 'J', 'O', 'Z', 'S', 'T'
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

// create a matrix (2D array)
const matrix = createPiece("I");

// == vs ===
// Idx == index
// offset = {x: 20, y: 20}
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

const player = {
  pos: { x: 20, y: 20 },
  matrix: matrix,
};

// offset = -1
function playerMove(offset) {
  player.pos.x += offset * sideLength;
  // if arena and player collide,
  if (collide(arena, player)) {
    // revert movement in the first line of this function
    player.pos.x -= offset * sideLength;
  }
}

function playerDrop() {
  player.pos.y += sideLength;

  // if arena and player collide,
  if (collide(arena, player)) {
    // revert movement in the first line of this function
    player.pos.y -= sideLength;
    // merge
    merge(arena, player);
    // reset player matrix and position
    playerReset();
    // sweep any complete lines
    arenaSweep();
  }
}

function playerReset() {
  // create a random piece
  player.matrix = createPiece(
    pieces[Math.floor(pieces.length * Math.random())]
  );
  // initialize player position to {x: 0, y: 0}
  player.pos.y = 0;
  player.pos.x = 0;

  // if the new piece is colliding with arena, restart the game (fill arena array with 0)
  if (collide(arena, player)) {
    arena.forEach(row => row.fill(0));
  }
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

// [[0, 0, 0]] 3x1
// [0, 1, 2].map

// [[1, 1, 1]]
function createMatrix(w, h) {
  return [...Array(h).keys()].map(function createNewArray() {
    return new Array(w).fill(0);
  });
  // return [...Array(h).keys()].map(() => new Array(w))
}

function merge(arena, player) {
  const m = player.matrix;
  const p = player.pos;

  // iterate over each row
  for (let y = 0; y < m.length; y++) {
    // iterate over each column
    for (let x = 0; x < m[y].length; x++) {
      // if column value is not 0, assign value of player.matrix to arena (so that player is merged into arena)
      if (m[y][x] !== 0) {
        arena[y + player.pos.y / sideLength][x + player.pos.x / sideLength] =
          m[y][x];
      }
    }
  }

  // player.matrix.forEach((row, y) => {
  //   row.forEach((col, x) => {
  //     if (col !== 0){
  //       arena[]
  //     }
  //   })
  // })
}

function collide(arena, player) {
  const m = player.matrix;
  const p = player.pos;
  // iterate over each row
  for (let y = 0; y < m.length; ++y) {
    // iterate over each column
    for (let x = 0; x < m[y].length; ++x) {
      // if column value is not 0 and there exist a row in arena and arena column value is not 0, arena and player collide
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

const arena = createMatrix(canvasWidth / sideLength, canvasHeight / sideLength);
