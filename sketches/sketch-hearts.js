const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for(let i = 0; i < 40; i++){
    const x = random.range(0,width);
    const y = random.range(0,height);
    agents.push(new Agent(x,y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++){
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++){
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > 200) continue;

        context.lineWidth = math.mapRange(dist, 0, 200, 12, 1);

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        context.stroke();
      }
    }
    agents.forEach(function(agent){
      agent.update();
      agent.drawHeart(context);
      agent.bounce(width,height);
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
class Agent{
  constructor(x,y){
    this.pos = new Vector(x,y);
    this.velocity = new Vector(random.range(-1,1),random.range(-1,1));
    this.radius = random.range(10,12);
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
    var width = 40;
    var height = 40;
  
    context.save();
    context.beginPath();
    var topCurveHeight = height * 0.3;
    context.moveTo(x, y + topCurveHeight);

    if (random.range(0,1) == 1){
      // top left curve
      context.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
      );
    
      // bottom left curve
      /**/context.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
      );

    }
    else{
      console.log((height + topCurveHeight) / 2);
      console.log(width / 2, y + (height + topCurveHeight) / 2);
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
  
  
    context.closePath();
    context.fillStyle = 'red';
    context.fill();
    context.restore();
  
  }

  draw(context){
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
    context.arc(0,0,this.radius,0,Math.PI*2);
    context.fill();
    context.stroke();

    context.restore();
  }
}
