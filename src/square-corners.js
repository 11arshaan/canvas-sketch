const canvasSketch = require("canvas-sketch");
import { degToRad, radToDeg } from "../utility/math";

const settings = {
  dimensions: [1080, 1080],
};

const sketch = ({ width, height }) => {


  //** +++++++ PARAMS +++++++ */
  const cornerOffset = 60;
  const cornerLength = 100;
  const cornerThickness = 5;
  const cornerApex = "round"; //round, butt, or square



  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const corners = {
      upleft: {
        x: 0 + cornerOffset,
        y: 0 + cornerOffset,
      },
      upright: {
        x: width - cornerOffset,
        y: 0 + cornerOffset,
      },
      downleft: {
        x: 0 + cornerOffset,
        y: height - cornerOffset,
      },
      downright: {
        x: width - cornerOffset,
        y: height - cornerOffset,
      },
    };

    
    context.lineWidth = cornerThickness;
    context.strokeStyle = "black";
    context.lineCap = cornerApex;
    
    context.beginPath();

    context.moveTo(corners.upleft.x, corners.upleft.y);
    context.lineTo(corners.upleft.x + cornerLength, corners.upright.y);
    context.stroke();
    context.moveTo(corners.upleft.x, corners.upleft.y);
    context.lineTo(corners.upleft.x, corners.upleft.y + cornerLength);
    context.stroke();

    context.moveTo(corners.upright.x, corners.upright.y);
    context.lineTo(corners.upright.x - cornerLength, corners.upright.y);
    context.stroke();
    context.moveTo(corners.upright.x, corners.upright.y);
    context.lineTo(corners.upright.x, corners.upright.y + cornerLength);
    context.stroke();

    context.moveTo(corners.downleft.x, corners.downleft.y);
    context.lineTo(corners.downleft.x + cornerLength, corners.downleft.y);
    context.stroke();
    context.moveTo(corners.downleft.x, corners.downleft.y);
    context.lineTo(corners.downleft.x, corners.downleft.y - cornerLength);
    context.stroke();

    context.moveTo(corners.downright.x, corners.downright.y);
    context.lineTo(corners.downright.x - cornerLength, corners.downright.y);
    context.stroke();
    context.moveTo(corners.downright.x, corners.downright.y);
    context.lineTo(corners.downright.x, corners.downright.y - cornerLength);
    context.stroke();


  };
};
canvasSketch(sketch, settings);
