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



    //var canvas = document.getElementById("can");
    //var ctx = canvas.getContext("2d");
    var lastend = 0;
    var data = [10,10,10,10,10,10,10,10,10,10,10,10];
    var myTotal = 0;
    var myColor = ['red','green','blue','purple','red','green','blue','purple','red','green','blue','purple'];

    for(var e = 0; e < data.length; e++)
    {
      myTotal += data[e];
    }

    for (var i = 0; i < data.length; i++) {
      context.save();
      context.translate(width*0.17,height*0.17)
      context.fillStyle = myColor[i];
      context.beginPath();
      context.moveTo(width/3,height/3);
      context.arc(width/3,height/3,height/3,lastend,lastend+(Math.PI*2*(data[i]/myTotal)),false);
      context.lineTo(width/3,height/3);
      context.fill();
      lastend += Math.PI*2*(data[i]/myTotal);
      context.restore();

    }




    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.01;
    const h = height * 0.4;

    const num = 12;
    const radius = width * 0;
    const slice = degToRad(360/num);
    let x,y;

    for (let i = 0; i < num; i++){
      let angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      console.log("points: "+x +" "+y);

      console.log(angle);
      context.save();
      context.translate(x,y);
      context.rotate(-angle);
  
      context.beginPath();
      context.rect(-w*0.5,1,w,h);
      context.fill();
      context.fillStyle = gradient;
      context.restore();

      /*context.save();
      context.translate(x,y);
      context.rotate(-angle);
  
      context.beginPath();
      context.lineTo(x,y)
      context.fill();
      context.fillStyle = gradient;
      context.restore();*/

    }
  };
};

canvasSketch(sketch, settings);
