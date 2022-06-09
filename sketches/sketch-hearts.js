const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for(let i = 0; i < 50; i++){
    const x = random.range(0,width);
    const y = random.range(0,height);
    agents.push(new Heart(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++){
      const heart = agents[i];
      for (let j = i + 1; j < agents.length; j++){
        const other = agents[j];

        const dist = heart.pos.getDistance(other.pos);

        if (dist > 20) continue;
        if(heart.half == 'whole' || other.half == 'whole') continue;
        heart.half = 'whole';
        other.half = 'none'
      }
    }
    agents.forEach(function(heart){
      heart.update();
      heart.drawHeart(context);
      heart.bounce(width-100,height-100);
    });
  };
};

canvasSketch(sketch, settings);


class Vector {
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  getDistance(v){
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx*dx + dy*dy); //pythag
  }
}
class Heart{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.velocity = new Vector(random.range(-1,1),random.range(-1,1));
    this.half = (random.range(0,1) > 0.5) ? 'left' :  'right';
  }

  update(){
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  bounce(width,height){
    if(this.pos.x <= 0 || this.pos.x >= width){
      this.velocity.x *=-1;
    }
    if(this.pos.y <= 0 || this.pos.y >= height){
      this.velocity.y *=-1;
    }
  }
  
  drawHeart(context) {
    var x = this.pos.x;
    var y = this.pos.y;
    var width = 200;
    var height = 200;
    
    // skip dead heart that became whole
    if (this.half == 'none') return;

    context.save();
    context.beginPath();
    var topCurveHeight = height * 0.3;
    context.moveTo(x, y + topCurveHeight);
    if (this.half == 'left'){ 
      // top left curve
      context.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
      );
    
      // bottom left curve
      context.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height);
    }
    else if (this.half == 'right') { 
      // top right curve
      context.bezierCurveTo(
        x, y, 
        x + width / 2, y, 
        x + width / 2, y + topCurveHeight
      );
  
      // bottom right curve
      context.bezierCurveTo(
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
      );
    }
    else {
        // top left curve
        context.bezierCurveTo(
          x, y, 
          x - width / 2, y, 
          x - width / 2, y + topCurveHeight
        );

        // bottom left curve
        context.bezierCurveTo(
          x - width / 2, y + (height + topCurveHeight) / 2, 
          x, y + (height + topCurveHeight) / 2, 
          x, y + height
        );

        // bottom right curve
        context.bezierCurveTo(
          x, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + (height + topCurveHeight) / 2, 
          x + width / 2, y + topCurveHeight
        );

        // top right curve
        context.bezierCurveTo(
          x + width / 2, y, 
          x, y, 
          x, y + topCurveHeight
        );
    }
    
    if (this.half == 'whole') {
      context.fillStyle = 'black';
    }
    else {
      context.fillStyle = 'red';
    }
    context.fill();
    context.restore();
  
  }
}
