const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
canvas.width = "400";
canvas.height = "400";
canvas.style.border = "1px solid black";

const maxWidth = canvas.clientWidth;
const maxHeight = canvas.clientHeight;
const SIZE = 5;
let x = 0;
let y = 0;
const FPS = 1;
let done = false;

let lastUpdated = null;

window.requestAnimationFrame(update);

function update(time) {
  if (done) return;

  if (!lastUpdated) {
    lastUpdated = time;
  }

  const elapsed = time - lastUpdated;

  if (elapsed > FPS) {
    Line.drawLine(x, y, x, y, SIZE, ctx);

    x = x + SIZE;

    if (x > canvas.clientWidth) {
      x = 0;
      y = y + SIZE;
    }

    if (y > canvas.clientHeight) {
      done = true;
    }

    lastUpdated = time;
  }

  window.requestAnimationFrame(update);
}

class Line {
  static drawLine(x1, y1, x2, y2, size, ctx) {
    const chance = Math.random();
    ctx.beginPath();
    if (chance < 0.5) {
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 + size, y2 + size);
    } else {
      ctx.moveTo(x1 + size, y1);
      ctx.lineTo(x2, y2 + size);
    }
    ctx.stroke();
  }
}
