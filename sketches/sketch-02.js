const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) =>{
  return degrees / 180 * Math.PI
}
const randomRange = (min,max) =>{
  return Math.random()*(max-min)+min;
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    const magenta = '#FF00FF';
    var gradient = context.createLinearGradient(0, 0, 500, 500);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("1" ,"blue");

    context.fillStyle = 'blue';

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.1;

    const num = 25;
    const radius = width * 0.3;
    const slice = degToRad(360/num);
    let x,y;

    for (let i = 0; i < num; i++){
      let angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      console.log(angle);
      context.save();
      context.translate(x,y);
      context.rotate(-angle);
      context.scale(random.range(0.1,3),random.range(0.2,0.5));
  
      context.beginPath();
      context.rect(-w*0.5,random.range(0,-h*0.5),w,h);
      context.fill();
      context.fillStyle = gradient;
      context.restore();

      context.save();
      context.translate(cx,cy);
      context.rotate(-angle);

      context.lineWidth = random.range(5,20);

      context.beginPath();
      //context.arc(0,0,radius,slice*-0.3,slice*0.3);
      context.arc(0,0,radius*random.range(0.7,1.3),slice*random.range(1,-5),slice*random.range(1,5));

      context.strokeStyle = gradient;
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
