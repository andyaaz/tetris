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
