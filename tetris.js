/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("tetris");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

ctx.scale(20, 20);

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const matrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0],
];

function drawMatrix(matrix, offset) {
  matrix.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      if (col !== 0) {
        ctx.fillStyle = "green";
        ctx.fillRect(colIdx + offset.x, rowIdx + offset.y, 1, 1);
      }
    });
  });
}

drawMatrix(matrix, { x: 1, y: 3 });
