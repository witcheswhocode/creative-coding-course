const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const { sign } = require('canvas-sketch-util/random');
const { radToDeg } = require('canvas-sketch-util/math');

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

    context.fillStyle = '#2B3A67';

    const signs = ['sun', 'moon', 'asc', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'northnode', 'chiron', 'mc' ];

    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.007;
    const h = height * 0.4;

    const num = 12;
    const radius = width * 0;
    const slice = degToRad(360/num);
    let x,y;

    const fire = '#E84855';
    const fireActive = '#E84855';
    const earth = '#002500';
    const earthActive = '#002500';
    const water = '#8cbcb9e3';
    const waterActive = '#8CBCB9';
    const air = '#C5CBD3';
    const airActive = '#C5CBD3';

    //var canvas = document.getElementById("can");
    //var ctx = canvas.getContext("2d");
    var lastend = 0; // angle start
    var lastend1 = 15; // angle start
    var sizeSlice = 10;
    var myTotal = sizeSlice*num;
    var myColor = [air,earth,fire,water,air,earth,fire,water,air,earth,fire,water,air,earth,fire,water];

    for (var i = 0; i < num; i++) {

      context.save();
      context.translate(width*0.17,height*0.17);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.arc(width/3,height/3,height/3,lastend,lastend+(Math.PI*2*(sizeSlice/myTotal)),false);
      context.lineTo(width/3,height/3);
      context.fillStyle = myColor[i];
      context.fill();
      context.restore();

      let angle = (slice * i)+lastend1;
      console.log(angle);

      x = cx + (width*0.4) * Math.sin(angle);
      y = cy + (width*0.4) * Math.cos(angle);
      context.save();
      context.translate(x,y);
      context.beginPath();
      context.rect(lastend1,lastend1+(Math.PI*2*(sizeSlice/myTotal)),10,10);
      context.fillStyle = myColor[i];
      context.fill();
      context.restore();

      let angle1 = (slice * i);
      //console.log(angle);

      x1 = (cx) + (width*0.4) * Math.sin(angle1);
      y1 = (cy) + (height*0.4) * Math.cos(angle1);

      console.log(signs[i] + ' ' + x1 + ' ' + y1);
      console.log(signs[i] + ' ' + lastend + ' ' + (lastend+(Math.PI*2*(sizeSlice/myTotal))));
      console.log(signs[i] + ' ' + radToDeg(lastend) + ' ' + radToDeg(lastend+(Math.PI*2*(sizeSlice/myTotal))));

      context.save();
      //context.translate(x,y);
      context.beginPath();
      //context.rotate(angle1);
      var text = signs[i];
      var font = "bold 12px serif";
      context.font = font;
      // Move it down by half the text height and left by half the text width
      var tw = context.measureText(text).width;
      var th = context.measureText("w").width; // this is a GUESS of height
      context.fillText(text, (x1) + (tw/2),(y1) + (th/2));

      context.restore();

      lastend += Math.PI*2*(sizeSlice/myTotal);
      lastend1 += Math.PI*2*(sizeSlice/myTotal);
    }


    for (let i = 0; i < num; i++){
      let angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      //console.log("points: "+x +" "+y);

      //console.log(angle);
      context.save();
      context.translate(x+w/2,y+w/2);
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
