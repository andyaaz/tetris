class Game {
  constructor({ w, h, sideLength }) {
    this.pieces = "TJLOSZI";
    this.player = {
      pos: { x: 0, y: 0 },
      matrix: this._createPiece(
        this.pieces[Math.floor(this.pieces.length * Math.random())]
      ),
    };
    this.arena = this._createMatrix(w, h);
    this.sideLength = sideLength;
  }

  move(offset) {
    this.player.pos.x += offset * this.sideLength;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.x -= offset * this.sideLength;
    }
  }

  drop() {
    this.player.pos.y += sideLength;
    if (this.collide(this.arena, this.player)) {
      this.player.pos.y -= this.sideLength;
      this.merge();
      this.playerReset();
      this.sweep();
    }
  }

  sweep() {
    outer: for (let y = this.arena.length - 1; y > 0; --y) {
      for (let x = 0; x < this.arena[y].length; ++x) {
        if (this.arena[y][x] === 0) {
          continue outer;
        }
      }
      const removedRow = this.arena.splice(y, 1);
      const newRow = removedRow.fill(0);
      this.arena.unshift(newRow);
      ++y;
    }
  }

  collide(arena, player) {
    const m = player.matrix;
    const p = player.pos;
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (
          m[y][x] !== 0 &&
          (arena[y + p.y / this.sideLength] &&
            arena[y + p.y / this.sideLength][x + p.x / this.sideLength]) !== 0
        ) {
          return true;
        }
      }
    }
    return false;
  }

  playerReset() {
    this.player.matrix = this._createPiece(
      this.pieces[Math.floor(this.pieces.length * Math.random())]
    );
    this.player.pos.y = 0;
    this.player.pos.x = 0;
    if (this.collide(this.arena, this.player)) {
      this.arena.forEach(row => row.fill(0));
    }
  }

  merge() {
    this.player.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          this.arena[y + this.player.pos.y / this.sideLength][
            x + this.player.pos.x / this.sideLength
          ] = value;
        }
      });
    });
  }

  _createMatrix(w, h) {
    return [...Array(h).keys()].map(() => new Array(w).fill(0));
  }

  _createPiece(type) {
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
}
