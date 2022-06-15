const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1920 ],
  animate: true
};

const startColorLevel = -10;
const incrementColorLevelBy = 0.05;
const deadHeart = 10;
const startFireLevel = 0;
const endFireLevel = 8;

const sketch = ({ context, width, height }) => {
  const agents = [];

  for(let i = 0; i < 50; i++){
    const x = random.range(0,width);
    const y = random.range(0,height);
    agents.push(new Heart(x,y,width,height));
  }

  return ({ context, width, height }) => {  
    context.clearRect(0, 0, width, height); // clear canvas

    context.fillStyle = "white";//"rgb(11, 9, 10)";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++){
      const heart = agents[i];
      for (let j = i + 1; j < agents.length; j++){
        const other = agents[j];

        const dist = heart.pos.getDistance(other.pos);

        if (dist > 20) continue;
        if(heart.half == 'dead' || other.half == 'dead') continue;
        if(heart.half == 'whole' || other.half == 'whole') continue;
        if(heart.half == 'none' || other.half == 'none') continue;
        heart.half = 'whole';
        other.half = 'none'
      }
    }
    agents.forEach(function(heart){
      if (heart.half != 'none' || heart.half != 'dead'){
        heart.update();
        heart.drawHeart(context);
        heart.bounce(width,height);
        
        if (heart.half == 'whole') {
          if (heart.colorLevel > startFireLevel && heart.colorLevel < endFireLevel){
            heart.drawFire(context);
          }
          if (heart.colorLevel > -2 && heart.dagger < 10){
            heart.dagger += 1;
            heart.drawLightning(context);
          }
        }
      }
      if (heart.half == 'dead'){
        heart.drop();
      }
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
  constructor(x,y,width,height){
    this.pos = new Vector(x,y);
    this.velocity = new Vector(random.range(-1,1),random.range(-1,1));
    this.half = (random.range(0,1) > 0.5) ? 'left' :  'right';
    this.colorLevel = startColorLevel;
    this.dagger = 0;
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.breakDirection = random.range(0,1);
  }

  update(){
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
  drop(){
    this.pos.y -= (-6)*this.colorLevel;
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
    if (this.colorLevel > deadHeart) this.half = 'dead';
    // skip dead heart that became whole
    if (this.half == 'none') return;
    if (this.half == 'dead' && this.colorLevel > 20) return;

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
    
    if (this.half == 'whole' || this.half == 'dead') {
      if (this.colorLevel > 0){
        if (this.colorLevel < 8){
          context.fillStyle = this.getHeartColor(this.colorLevel);
        }
        else if (this.colorLevel > 8) {
          context.fillStyle = this.getHeartColor(8);
          context.shadowBlur = 30;
          context.shadowColor = "black";
        }
      }
      else {
        context.fillStyle = this.getHeartColor(0);
      }
      this.colorLevel += incrementColorLevelBy;
    }
    else {
      context.fillStyle = this.getHeartColor(0);
    }
    context.fill();
    context.restore();

    // crack in the heart when it's dying
    if (this.colorLevel > deadHeart-3){
      context.save();
      context.beginPath();
      context.strokeStyle = 'white';
      context.lineWidth = 5;
      context.moveTo(x, y + topCurveHeight - 10);
      if (this.breakDirection < 0.5){
        if (this.colorLevel > 7) context.lineTo(x+20, y+random.range(80,90));
        if (this.colorLevel > 8) context.lineTo(x-20, y+random.range(100,110));
        if (this.colorLevel > 9) context.lineTo(x+20, y+random.range(140,150));
      }
      else{
        if (this.colorLevel > 7) context.lineTo(x-20, y+random.range(80,90));
        if (this.colorLevel > 8) context.lineTo(x+20, y+random.range(100,110));
        if (this.colorLevel > 9) context.lineTo(x-20, y+random.range(140,150));
      }
      context.stroke();
      context.restore();
    }
  
  }
  drawBolt(x1,y1,x2,y2,displace,context)
  {
    if (displace < 100) {
      context.moveTo(x1,y1);
      context.lineTo(x2,y2);
    }
    else {
      var mid_x = (x2+x1)/2;
      var mid_y = (y2+y1)/2;
      mid_x += (Math.random()-.5)*displace;
      mid_y += (Math.random()-.5)*displace;
      drawBolt(x1,y1,mid_x,mid_y,displace/2);
      drawBolt(x2,y2,mid_x,mid_y,displace/2);
    }
  }
  drawLightning(context) {
    var x = this.pos.x;
    var y = this.pos.y;
    var xp = this.canvasWidth/2;
    var yp = 0;
    context.save();
    context.beginPath();
    context.moveTo(xp, yp);
    /*while (Math.abs(xp-x) > 5 && Math.abs(yp-y+100) > 5){
      if (Math.abs(xp-x) > 25){
        xp = xp+random.range(-25,25);
      } 
      if (Math.abs(yp-y) > 25){
        yp = yp+random.range(-25,25);
      } 
      context.lineTo(xp, yp);
    }*/
    var boltDenominator = 100;
    const dx = x - xp;
    const dy = y - yp;
    const dist =  Math.sqrt(dx*dx + dy*dy); //pythag
    const lildist = dist/boltDenominator;
    for (let i = 0; i < boltDenominator; i++){

    }
    /*for (let i = 500; i > 0; i--){
      if(Math.abs(xp-x) < 25 || Math.abs(yp-y+100) < 25) continue;
      context.lineTo(xp, yp);
      xp = xp+random.range(-25,25);
      yp = yp+random.range(-25,50);
    }*/
    /*context.lineTo(random.range(x,xp), Math.abs((y+yp)/4));
    context.lineTo(random.range(x,xp), Math.abs((y+yp)/2));
    context.lineTo(random.range(x,xp), (Math.abs((y+yp)/4)*3));*/
    context.lineTo(x, y+100);
    context.lineWidth = 10;
    context.strokeStyle = 'yellow';//`rgba(255, 255, 255, 0.4)`;
    context.shadowBlur = 30;
    context.shadowColor = "orange";
    context.stroke();
    context.closePath();
    context.restore();
  }
  
  drawDagger(context){
    var x = this.pos.x;
    var y = this.pos.y;



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
    else {
      return "white"
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
