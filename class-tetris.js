const sideLength = 20;
const dropInterval = 1000;
let dropTimer = 0;
const canvasWidth = 200;
const canvasHeight = 200;
const game = new Game({
  w: canvasWidth / sideLength,
  h: canvasHeight / sideLength,
  sideLength,
});

function setup() {
  createCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background(0);
  dropTimer += deltaTime;
  if (dropTimer > dropInterval) {
    game.drop();
    dropTimer = 0;
  }
  drawMatrix(game.arena, { x: 0, y: 0 });
  drawMatrix(game.player.matrix, game.player.pos);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game.move(-1);
  } else if (keyCode === RIGHT_ARROW) {
    game.move(1);
  } else if (keyCode === DOWN_ARROW) {
    game.drop();
  }
}

function keyTyped() {
  if (key === "q") {
    console.log("rotate anti clockwise");
  } else if (key === "w") {
    console.log("rotate clockwise");
  }
}
