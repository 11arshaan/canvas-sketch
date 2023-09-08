const canvasSketch = require("canvas-sketch");
import { randomInt, randomFloat } from "../utility/math";

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const sketch = ({ width, height }) => {
  const count = 100;
  const bubbles = [];
  for (let i = 0; i < count; i++) {
    const radius = randomInt(4, 30);
    const x = randomInt(radius, width - radius);
    const y = randomInt(radius, height - radius);
    bubbles.push(new Bubble(x, y, radius));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    bubbles.forEach((bubble) => {
      bubble.update();
      bubble.draw(context);
      bubble.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Bubble {
  constructor(x, y, radius) {
    this.radius = radius;
    this.position = new Vector(x, y);
    this.velocity = new Vector(randomFloat(-1, 1), randomFloat(-1, 1));
  }
  draw(context) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 4 * (this.radius / 25);
    context.fill();
    context.stroke();
    context.restore();
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  bounce(width, height) {
    if (this.position.x <= this.radius || this.position.x >= width - this.radius) {
      this.velocity.x *= -1;
    }
    if (this.position.y <= this.radius || this.position.y >= height - this.radius) {
      this.velocity.y *= -1;
    }

  }
}
