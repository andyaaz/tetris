/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("tetris");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#000";
ctx.fillRect(50, 50, canvas.width, canvas.height);
