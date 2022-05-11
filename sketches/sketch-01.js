const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {

    const w = width * 0.10;
    const h = height * 0.10;
    const gap = width * 0.015;
    const ix = width * 0.05;
    const iy = height * 0.05;
    const off = width * 0.03;
    const blue = '#099FFF';
    const pink = '#FF00CC';
    const purple = '#CC00FF';
    const green = '#00FF33';

    setInterval(function(){
      context.fillStyle = 'black';
      context.fillRect(0,0,width,height);
      context.lineWidth = width * 0.01;
      let x, y, num = 8;

      for (let i = 0; i < num; i++){
        for (let j = 0; j < num; j++){
          x = ix + (w + gap) * i;
          y = iy + (h + gap) * j;

          // larger square
          context.beginPath();
          context.rect(x, y, w, h);
          context.strokeStyle = purple;
          context.stroke();

          // middle square
          if (Math.random() < 0.8){
            context.beginPath();
            context.rect(x + off/2, y + off/2, w - off, h - off);
            context.strokeStyle = blue;
            context.stroke();
          }
          // smaller square
          if (Math.random() < 0.8){
              context.beginPath();
              context.rect(x + off-gap/12, y + off-gap/12, w/2-gap/2, h/2 - gap/2);
              context.strokeStyle = pink;
              context.stroke();
          }
          // smallest square
          if (Math.random() > 0.5){
              context.beginPath();
              context.rect(x + off+15, y + off+15, w/2-gap*2.5, h/2 - gap*2.5);
              context.strokeStyle = green;
              context.stroke();
          }
        }
      }
    }, 1500);
  };
};

canvasSketch(sketch, settings);
