const canvasSketch = require("canvas-sketch");
import { degToRad, radToDeg } from "../utility/math";

const settings = {
  dimensions: [2048, 2048],
};

const sketch = ({width, height}) => {

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      context.save();
      context.translate(x, y); //move to cell top-left corner
      context.translate(margx, margy); //add grid margin
      context.translate(cellw * 0.5, cellh * 0.5); //move to cell center
      
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke();
      context.restore();
    }

  };


};
canvasSketch(sketch, settings);