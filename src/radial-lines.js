const canvasSketch = require("canvas-sketch");
import { degToRad, radToDeg } from "../utility/math";

const settings = {
  dimensions: [2048, 2048],
  animate: true,
};

const sketch = () => {
  let rotation = 0;
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    //establish a circle in the center of the canvas
    const radius = width * 0.3;
    const cx = width * 0.5;
    const cy = height * 0.5;
    

    //set number and size of lines
    const count = 12;
    let x, y;
    const w = width * 0.01;
    const h = height * 0.1;

    //draw lines around the circle
    for (let i = 0; i <= count; i++) {
      const slice = degToRad(180 / count);
      const angle = (slice * i) + rotation;
      

      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.beginPath();
      context.rect(-w / 2, -h / 2, w, h);
      context.fill();
      context.restore();
    }

      rotation = (rotation + .01) % 360;
  };
};

canvasSketch(sketch, settings);
