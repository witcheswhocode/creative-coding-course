const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const params = {
  hwidth: 500,
  hheight: 500,
};

function getXDimension(layer){
  switch(layer){
    case 0:
      return 0.5
    case 1:
      return 0.45
    case 2:
      return 0.35
    case 3:
      return 0.30
    case 4:
      return 0.20
    case 5:
      return 0.10
    case 6:
      return 0.05
  }
}
function getRandomColor(){
  const randomNum = random.rangeFloor(0,2);
  const colors = ["rgba(255, 0, 0, 0.1)","rgba(255, 265, 0, 0.1)","rgba(255, 237, 71, 0.1)"];
  return colors[randomNum];
}

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    var x = width/2;
    var y = height/2;
    var hwidth = 500;
    var hheight = 500;
    var topCurveHeight = hheight * 0.3;
  
    context.save();
    context.beginPath();
    context.moveTo(x, y + topCurveHeight);

    // top left curve
    context.bezierCurveTo(
      x, y, 
      x - hwidth / 2, y, 
      x - hwidth / 2, y + topCurveHeight
    );

    // bottom left curve
    context.bezierCurveTo(
      x - hwidth / 2, y + (hheight + topCurveHeight) / 2, 
      x, y + (hheight + topCurveHeight) / 2, 
      x, y + hheight
    );

    // bottom right curve
    context.bezierCurveTo(
      x, y + (hheight + topCurveHeight) / 2, 
      x + hwidth / 2, y + (hheight + topCurveHeight) / 2, 
      x + hwidth / 2, y + topCurveHeight
    );

    // top right curve
    context.bezierCurveTo(
      x + hwidth / 2, y, 
      x, y, 
      x, y + topCurveHeight
    );


    context.closePath();
    context.fillStyle = 'red';
    context.fill();
    context.restore();

    let particles = []
    for (let j = 0; j < 7; j++){
      const inc = 23*j;
      console.log(inc);
      for (let i = inc; i < 150; i++){
        const xs = x-hwidth*(getXDimension(j));
        const xe = x+hwidth*(getXDimension(j));
        const ys = y + topCurveHeight*(0.6-(j*0.3));
        const ye = y + topCurveHeight*(1.2-(j*0.3));
        context.save();
        context.beginPath();
        context.arc(random.range(xs,xe), random.range(ys,ye), 40, 0, 2 * Math.PI);
        context.fillStyle = getRandomColor();

        context.fill();
        context.restore();
      }

    }


    /*context.save();
    context.beginPath();
    context.arc(x-hwidth*0.2, y + topCurveHeight*-0.5, 20, 0, 2 * Math.PI);
    context.arc(x-hwidth*0.3, y + topCurveHeight*-0.3, 20, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.restore();
    context.save();
    context.beginPath();
    context.arc(x-hwidth*0.4, y + topCurveHeight*-0.1, 20, 0, 2 * Math.PI);
    context.arc(x-hwidth*0.45, y + topCurveHeight*0.2, 20, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.restore();
    context.save();
    context.beginPath();
    context.arc(x-hwidth*0.45, y + topCurveHeight*0.5, 20, 0, 2 * Math.PI);
    context.arc(x-hwidth*0.5, y + topCurveHeight*0.8, 20, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.restore();
    context.save();
    context.beginPath();
    context.arc(x-hwidth*0.5, y + topCurveHeight*1.2, 20, 0, 2 * Math.PI);
    context.arc(x-hwidth*0.45, y + topCurveHeight*1.5, 20, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.restore();*/
    
  };
};

function createPane(){
  const pane = new tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'Heart'});
  folder.addInput(params, 'hwidth', {min:500,max:1000,step:1});
  folder.addInput(params, 'hheight', {min:500,max:1000,step:1});
}

createPane();
canvasSketch(sketch, settings);
