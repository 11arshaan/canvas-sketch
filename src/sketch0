const canvasSketch = require("canvas-sketch");
import { degToRad, radToDeg } from "../utility/math";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  };

  canvasSketch(sketch, settings);
};
