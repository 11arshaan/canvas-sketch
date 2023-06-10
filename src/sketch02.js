const canvasSketch = require('canvas-sketch');
import { degToRad, radToDeg } from '../utility/math';

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";
    
  
    const radius = width*0.3;
    const cx = width * .5;
    const cy = height * .5;

    const count = 12;
    let x, y;
    const w = width * 0.01;
    const h = height * 0.1;

    for (let i=0; i < count; i++) {
      const slice = degToRad(360 / count);
      const angle = slice * i;

      x = cx + Math.sin(angle) * radius;
      y = cy + Math.cos(angle) * radius;  

      context.save();
      context.translate(x, y);
      context.rotate(-angle);
      context.beginPath();
      context.rect(-w/2, -h/2, w, h);
      context.fill();
      context.restore();

    }

    
  };
};


canvasSketch(sketch, settings);
