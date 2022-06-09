const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for(let i = 0; i < 30; i++){
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
    this.colorLevel = 0;
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
    
    // kill heart after it burns
    if (this.colorLevel > 10) return;
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
      if (this.colorLevel < 8){
        context.fillStyle = this.getHeartColor(this.colorLevel);
      }
      else {
        context.fillStyle = this.getHeartColor(10);
      }
      this.colorLevel += 0.05;
      //this.drawFire();
    }
    else {
      context.fillStyle = this.getHeartColor(0);
    }
    context.fill();
    context.restore();

    if (this.half == 'whole') {
      this.drawFire(context);
    }
  
  }
  getXDimension(layer){
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
  getHeartColor(layer){
    /*if(3 <= layer < 4.5){
      console.log('yes');
      return "rgb(164, 22, 26)"
    }*/
    if (layer < 1){
      return "rgb(229, 56, 59)";
    }
    else if (layer < 2){
      return "rgb(186, 24, 27)";
    }
    else if (layer < 4){
      return "rgb(164, 22, 26)";
    }
    else if (layer < 6){
      return "rgb(102, 7, 8)";
    }
    else if (layer < 8){
      return "rgb(22, 26, 29)";
    }
    else if (layer >= 8){
      return "rgb(11, 9, 10)";
    }
  }
  getRandomColor(){
    const randomNum = random.rangeFloor(0,2);
    const colors = ["rgba(255, 0, 0, 0.1)","rgba(255, 265, 0, 0.1)","rgba(255, 237, 71, 0.1)"];
    return colors[randomNum];
  }

  drawFire(context){
    var x = this.pos.x;
    var y = this.pos.y;
    var hwidth = 200;
    var hheight = 200;
    var topCurveHeight = hheight * 0.3;
    for (let j = 0; j < 7; j++){
      const inc = 10*j;
      for (let i = inc; i < 100; i++){
        const xs = x-hwidth*(this.getXDimension(j));
        const xe = x+hwidth*(this.getXDimension(j));
        const ys = y + topCurveHeight*(0.6-(j*0.3));
        const ye = y + topCurveHeight*(1.2-(j*0.3));
        context.save();
        context.beginPath();
        context.arc(random.range(xs,xe), random.range(ys,ye), 20, 0, 2 * Math.PI);
        context.fillStyle = this.getRandomColor();

        context.fill();
        context.restore();
      }
    }
  }
}
