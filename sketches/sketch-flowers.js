const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'blue';
    context.fillRect(0, 0, width, height);
    const x = width * 0.5;
    const y = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 4;
    const radius = width * 0.3;
    const slice = math.degToRad(360/num);

    let angle = slice;
    let cx = radius * Math.cos(num*angle) * Math.cos(angle);
    let cy = radius * Math.cos(num*angle) * Math.sin(angle);

    context.save();
    context.translate(x,y);
    context.rotate(-angle);

    context.lineWidth = random.range(5,20);

    context.beginPath();
    context.arc(0,0,radius,cx,cy);

    context.strokeStyle = 'purple';
    context.stroke();

    context.restore();
  };
};

canvasSketch(sketch, settings);
