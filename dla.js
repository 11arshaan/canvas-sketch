const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [2048, 2048],
  animate: true
};

const sketch = ({width, height}) => {
  const count = 1000;
  const radius = 15;
  const velocityFactor = 5;

  //start with center seed
  const seed = new Particle(1024, 1024, radius, false);
  seed.x = width / 2;
  seed.y = height / 2;
  seed.stuck = true;
  const tree = [seed];
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(width, height, radius, true, velocityFactor));
  }
  const lines = [];

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.fillRect(0, 0, width, height);

   
    //update particles
    particles.forEach((particle) => {
      particle.update(tree, lines);
      if (!particle.stuck) {
        particle.draw(context);
        particle.bounce(width, height, particles);
      } else {
        tree.push(particle);
        particles.splice(particles.indexOf(particle), 1);
      }
    });

    //draw tree
    // tree.forEach((particle) => {
    //   particle.draw(context);
    // }
    // );

    lines.forEach((line) => {
      line.draw(context);
    }
    );
  };
};

canvasSketch(sketch, settings);

class Particle {
  constructor(width, height, radius, randomVelocity = true, velocityFactor = 50) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = radius;
    this.stuck = false;

    if (randomVelocity) {
      this.velocity = { x: (Math.random() * 2 - 1) * velocityFactor, y: (Math.random() * 2 - 1)*velocityFactor };
    } else {
      let angle = Math.random() * 2 * Math.PI;
      this.velocity = { x: Math.cos(angle), y: Math.sin(angle) };
    }
  }

  update(tree, lines) {
    tree.forEach((particle) => {
      if (this !== particle) {
        let distance = Math.sqrt(
          Math.pow(this.x - particle.x, 2) + Math.pow(this.y - particle.y, 2)
        );
        if (distance < this.radius + particle.radius) {
          if (this.stuck) {
            return;
          }
          this.stuck = true;
          //draw a line from this to particle
          lines.push(new Line(this.x, this.y, particle.x, particle.y));
        }
      }
    });


    if (!this.stuck) {
      this.x += this.velocity.x;
      this.y += this.velocity.y;
    }
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.lineWidth = 5;
    context.fill();
    context.stroke();
    context.restore();
  }

  bounce(width, height, particles) {
    if (this.x <= this.radius || this.x >= width - this.radius) {
      this.velocity.x *= -1;
    }
    if (this.y <= this.radius || this.y >= height - this.radius) {
      this.velocity.y *= -1;
    }

    //bounce off of other particles
    particles.forEach((particle) => {
      if (this !== particle) {
        let distance = Math.sqrt(
          Math.pow(this.x - particle.x, 2) + Math.pow(this.y - particle.y, 2)
        );
        if (distance < this.radius + particle.radius) {
          let temp = this.velocity;
          this.velocity = particle.velocity;
          particle.velocity = temp;
        }
      } 
    }); 
  }
}


class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw(context) {
    context.save();
    context.beginPath();
    context.moveTo(this.x1, this.y1);
    context.lineTo(this.x2, this.y2);
    context.stroke();
    context.restore();
  }
}