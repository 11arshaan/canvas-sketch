const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");
const Tweakpane = require("tweakpane");


import { degToRad, radToDeg } from "../utility/math";


const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

const params = {
  cols: 12,
  rows: 12,
  scaleMin: 0.2,
  scaleMax: 30,
  amplitude: 0.2,
  frequency: 0.001,
};

const sketch = ({width, height}) => {

  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

   
    const numCells = params.cols * params.rows;

    const gridw = width * 0.95;
    const gridh = height * 0.95;
    const cellw = gridw / params.cols;
    const cellh = gridh / params.rows;
    const margx = (width - gridw) * 0.5;
    const margy = (height - gridh) * 0.5;

    for (let i = 0; i < numCells; i++) {
      const col = i % params.cols;
      const row = Math.floor(i / params.cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.9;
      const h = cellh * 0.9;

      // const n = random.noise2D(x + frame * 10, y, params.frequency);
      const n = random.noise3D(x, y, frame * 10, params.frequency);
      const angle = n * Math.PI * params.amplitude;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y); //move to cell top-left corner
      context.translate(margx, margy); //add grid margin
      context.translate(cellw * 0.5, cellh * 0.5); //move to cell center
      context.rotate(angle); //rotate
      
      context.lineWidth = scale;
      context.beginPath();
      context.moveTo(w * -0.5, 0)
      context.lineTo(w * 0.5, 0)
      context.stroke();
      context.restore();
    }

  };


};

const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder = pane.addFolder({title: "Grid"});
  folder.addInput(params, "cols", {min: 1, max: 30, step: 1});
  folder.addInput(params, "rows", {min: 1, max: 30, step: 1});
  folder.addInput(params, "scaleMin", {min: 1, max: 100});
  folder.addInput(params, "scaleMax", {min: 1, max: 100});

  folder = pane.addFolder({title: "Noise"});
  folder.addInput(params, "amplitude", {min: 0, max: 1});
  folder.addInput(params, "frequency", {min: -0.002, max: 0.002});

}
createPane();
canvasSketch(sketch, settings);