const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    let count = 10;
    const gap = 10;
    const w = (width / count) - gap;
    const h = (height / count) - gap;
    let x = 0;
    let y = 0


    for (let i =0; i<count; i++) {
      for (let j =0; j<count; j++) {
        context.strokeStyle = 'black';
        context.beginPath();
        context.rect(x, y, w, h);
        context.stroke();


        if (Math.random() < 0.5) {
          context.beginPath();
          context.rect(x + 10, y+10, w-20, h-20);
          context.stroke();
        }

        x += w + gap;

        
      }
      x = 0;;
      y += h + gap;
    }

  };
};

canvasSketch(sketch, settings);
