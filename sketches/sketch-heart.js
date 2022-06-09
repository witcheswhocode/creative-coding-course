const canvasSketch = require('canvas-sketch');
const tweakpane = require('tweakpane');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const params = {
  hwidth: 50,
  hheight: 50,
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    var x = width/2;
    var y = height/2;
    var hwidth = params.hwidth;
    var hheight = params.hheight;
  
    context.save();
    context.beginPath();
    var topCurveHeight = hheight * 0.3;
    context.moveTo(x, y + topCurveHeight);

    // top right curve
    context.bezierCurveTo(
      x, y, 
      x + hwidth / 2, y, 
      x + hwidth / 2, y + topCurveHeight
    );

    // bottom right curve
    context.bezierCurveTo(
      x + hwidth / 2, y + (hheight + topCurveHeight) / 2, 
      x, y + (hheight + topCurveHeight) / 2, 
      x, y + hheight
    );

    // bottom right curve
    /*context.bezierCurveTo(
      x, y + (hheight + topCurveHeight) / 2, 
      x + hwidth / 2, y + (hheight + topCurveHeight) / 2, 
      x + hwidth / 2, y + topCurveHeight);
    
    // top right curve
    context.bezierCurveTo(
      x + hwidth / 2, y, 
      x, y, 
      x, y + topCurveHeight
    );*/


    context.closePath();
    context.fillStyle = 'red';
    context.fill();
    context.restore();
    
  };
};

function createPane(){
  const pane = new tweakpane.Pane();
  let folder;

  folder = pane.addFolder({title: 'Heart'});
  folder.addInput(params, 'hwidth', {min:2,max:50,step:1});
  folder.addInput(params, 'hheight', {min:2,max:50,step:1});
}

createPane();
canvasSketch(sketch, settings);
