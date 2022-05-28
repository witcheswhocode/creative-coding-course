const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');
const { sign } = require('canvas-sketch-util/random');
const { radToDeg } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const signInfo = {
  'aries': {'sister':'libra','html':'&#9800;','element':'fire','major':'C','minor':'Am'},
  'taurus': {'sister':'scorpio','html':'&#9800;','element':'earth','major':'G','minor':'Em'},
  'gemini': {'sister':'sagittarius','html':'&#9800;','element':'air','major':'D','minor':'Bm'}, 
  'cancer': {'sister':'capricorn','html':'&#9800;','element':'water','major':'A','minor':'F#m'},
  'leo': {'sister':'aquarius','html':'&#9800;','element':'fire','major':'E','minor':'C#m'},
  'virgo': {'sister':'pisces','html':'&#9800;','element':'earth','major':'B','minor':'G#m'},
  'libra': {'sister':'aries','html':'&#9800;','element':'air','major':'F#','minor':'D#m'}, // major Gb, minor Ebm
  'scorpio': {'sister':'taurus','html':'&#9800;','element':'water','major':'C#','minor':''}, // major Db, minor Bbm
  'sagittarius': {'sister':'gemini','html':'&#9800;','element':'fire','major':'G#','minor':'Fm'}, // major Ab
  'capricorn': {'sister':'cancer','html':'&#9800;','element':'earth','major':'D#','minor':'Cm'}, // major Eb
  'aquarius': {'sister':'leo','html':'&#9800;','element':'air','major':'A#','minor':'Gm'}, // major Bb
  'pisces': {'sister':'virgo','html':'&#9800;','element':'water','major':'F','minor':'Dm'}, 
}
const planetInfo = {
  'sun': '☉',
  'moon': '☾',
  'asc': '☊',
  'mercury': '☿',
  'venus': '♀',
  'mars': '♂',
  'jupiter': '♃',
  'saturn': '♄',
  'uranus': '♅',
  'neptune': '♆',
  'pluto': '♇',
  /*'northnode': 'nn',
  'chiron': 'c',
  'mc': 'mc',*/
}
const planets = ['sun', 'moon', 'asc', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'/*, 'northnode', 'chiron', 'mc' */];
const signOrder = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const lizBirthChart = {
  'sun': 'cancer',
  'moon': 'cancer',
  'asc': 'virgo',
  'mercury': 'cancer',
  'venus': 'cancer',
  'mars': 'cancer',
  'jupiter': 'cancer',
  'saturn': 'cancer',
  'uranus': 'cancer',
  'neptune': 'cancer',
  'pluto': 'cancer',
  'northnode': 'virgo',
  'chiron': 'virgo',
  'mc': 'virgo',
}
/*const lizBirthChart = {
  'sun': 'virgo',
  'moon': 'cancer',
  'asc': 'virgo',
  'mercury': 'leo',
  'venus': 'leo',
  'mars': 'libra',
  'jupiter': 'leo',
  'saturn': 'aquarius',
  'uranus': 'capricorn',
  'neptune': 'capricorn',
  'pluto': 'scorpio',
  'northnode': 'capricorn',
  'chiron': 'leo',
  'mc': 'gemini',
}*/

const degToRad = (degrees) =>{
  return degrees / 180 * Math.PI
}
const randomRange = (min,max) =>{
  return Math.random()*(max-min)+min;
}

const getColor = (element) =>{
    switch (element){
      /*case 'fire':
        return '#FFA8A2';
      case 'earth':
        return '#ABD781';
      case 'water':
        return '#6FC0CB';
      case 'air':
        return '#FAF6F8';*/
      case 'fire':
        return '#FFE7E2';
      case 'earth':
        return '#E7F4DB';
      case 'water':
        return '#D6EDF0';
      case 'air':
        return '#FDFAFB';
      case 'fireActive':
        return '#FE5F55';
      case 'earthActive':
        return '#669D31';
      case 'waterActive':
        return '#28666E';
      case 'airActive':
        return '#DCBCC8';//'#EAD7DE';//'#F0E2E7';
    }
  }
  /*const fire = '#ffa39d';
  const fireActive = '#de7972';
  const earth = '#a6d57a';
  const earthActive = '#658745';
  const water = '#67bdc8';
  const waterActive = '#345b60';
  const air = '#f6eef1';
  const airActive = '#ede3e7';*/

const sketch = () => {
  return ({ context, width, height }) => {
    const birthchart = new Birthchart(lizBirthChart,width,height,context);
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#2B3A67';
    const bc = birthchart.createBirthChart(width,height);
    /*for (var i = 0; i < 12; i++){
      setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[i]],'Active')},1000*i);
      setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[i]],'')},1000*(i+1));
    }*/
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[0]],'Active')},1000*0);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[0]],'')},1000*1);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[1]],'Active')},1000*1);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[1]],'')},1000*2);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[2]],'Active')},1000*2);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[2]],'')},1000*3);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[3]],'Active')},1000*3);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[3]],'')},1000*4);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[4]],'Active')},1000*4);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[4]],'')},1000*5);

    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[5]],'Active')},1000*5);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[5]],'')},1000*6);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[6]],'Active')},1000*6);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[6]],'')},1000*7);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[7]],'Active')},1000*7);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[7]],'')},1000*8);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[8]],'Active')},1000*8);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[8]],'')},1000*9);


    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[9]],'Active')},1000*9);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[9]],'')},1000*10);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[10]],'Active')},1000*10);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[10]],'')},1000*11);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[11]],'Active')},1000*11);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[11]],'')},1000*12);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[12]],'Active')},1000*12);
    setTimeout(()=>{birthchart.colorArc(lizBirthChart[planets[12]],'')},1000*13);

    /*const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.005;
    const h = height * 0.4;

    const num = 12;
    const radius = width * 0;
    const slice = degToRad(360/num);
    let x,y;

    for(let i = 0; i<num;i++){

      let angle = (slice * i)-(slice*3)*0.82;
      //console.log(angle);

      x = cx + (width*0.13) * Math.sin(-angle);
      y = cy + (height*0.13) * Math.cos(-angle);

      context.beginPath();
      //context.rotate(angle1);
      var text = '♍';
      var font = "bold 12px serif";
      context.font = font;
      //console.log(signInfo['aries'].html);
      // Move it down by half the text height and left by half the text width
      var tw = context.measureText(text).width;
      var th = context.measureText("w").width; // this is a GUESS of height
      context.fillText(text, (x),(y));

      context.restore();

    }*/
  };
};

canvasSketch(sketch, settings);

class ArcLocation{
  constructor(lastends,lastende){
    this.lastends = lastends;
    this.lastende = lastende;
  }
}
class Birthchart {
  constructor(array,width,height,context){
    for (var i = 0; i < planets.length; i++){
      this[planets[i]] = array[planets[i]];
    }
    this.chartOrder = this.sortSignOrderToGenerateChart(); 
    this.planetSigns = this.getPlanetLocations(); 
    this.num = 12;
    this.cx = width * 0.5;
    this.cy = height * 0.5;
    this.radius = width * 0.4;
    this.w = width * 0.004;
    this.h = height * 0.4;
    this.width = width;
    this.height = height;
    this.slice = degToRad((360/this.num))
    this.arcLocations = [];
    this.context = context;
  }
  sortSignOrderToGenerateChart(){ // asc should be the sixth item in the list
    var sisterIndex = signOrder.indexOf(signInfo[this.getAscendent()]['sister']);

    if (sisterIndex == signOrder.length-1){
      return signOrder
    }
    else if (sisterIndex < signOrder.length-1){
      return (signOrder.slice(sisterIndex+1,signOrder.length) +','+ signOrder.slice(0,sisterIndex+1)).split(',');
    }
    else{
      console.log('else on sign order sort!!!');
      return signOrder;
    }
  }
  getPlanetLocations(){
    var arr = {};
    for (var i = 0; i < planets.length; i++){
      var currentPlanet = planets[i];
      var currentSign = this[currentPlanet];
      if (currentPlanet == planets[i]){
        if (arr[currentSign]){
          arr[currentSign] += ','+currentPlanet;
        }
        else {
          arr[currentSign] = currentPlanet;
        }
      }
      
    }
    return arr;
  }
  getAscendent(){
    return this.asc;
  }
  createBirthChart(){
    let x,y;

    const birthchartOrder = this.chartOrder;

    /*var canvas = document.getElementById("can");
    var context = canvas.getContext("2d");*/
    var lastend = 0; // angle start
    var sizeSlice = 10;
    var myTotal = sizeSlice*this.num;
    //const slice = degToRad((360/this.num));

    for (var i = 0; i < this.num; i++) {
      this.context.save();
      this.context.translate(this.width*0.17,this.height*0.17);
      this.context.beginPath();
      //context.moveTo(width/3,height/3);
      this.context.arc(this.width/3,this.height/3,this.height/3,lastend,lastend+(Math.PI*2*(sizeSlice/myTotal)),false);
      this.context.lineTo(this.width/3,this.height/3);
      this.context.fillStyle = getColor(signInfo[birthchartOrder[i]].element);
      this.context.fill();
      this.context.restore();


      let angle = (this.slice * i)-(this.slice*3)*0.83;

      x = this.cx + (this.width*0.40) * Math.sin(-angle);
      y = this.cy + (this.height*0.40) * Math.cos(-angle);
      this.context.save();
      //context.translate(x,y);
      this.context.beginPath();
      //context.rotate(angle1);
      var text = birthchartOrder[i]+' / ' + signInfo[birthchartOrder[i]].major;
      var font = "bold 20px serif";
      this.context.font = font;
      // Move it down by half the text height and left by half the text width
      var tw = this.context.measureText(text).width;
      var th = this.context.measureText("w").width; // this is a GUESS of height
      this.context.fillText(text, (x - 30),(y));

      this.context.restore();

      this.arcLocations.push(new ArcLocation(lastend, lastend+(Math.PI*2*(sizeSlice/myTotal))));
      lastend += Math.PI*2*(sizeSlice/myTotal);
      this.addPlanets(birthchartOrder[i]);
    }
    this.createLines();
  }
  createLines(){
    let x,y;
    for (let i = 0; i < this.num; i++){
      let angle = (this.slice * i)-(this.slice*3);

      x = this.cx + 0 * Math.sin(angle);
      y = this.cy + 0 * Math.cos(angle);
      //console.log(angle);

      this.context.save();
      this.context.translate(x+this.w/2,y+this.w/2);
      this.context.rotate(-angle);
  
      this.context.beginPath();
      this.context.rect(-this.w*0.5,1,this.w,this.h);
      this.context.fillStyle = '#2B3A67';
      this.context.fill();
      this.context.restore();
    }

  }
  colorArc(sign,type){
    //console.log(sign);
    //console.log(this.arcLocations[this.chartOrder.indexOf(sign)-1]);
    var sizeSlice = 10;

    this.context.save();
    this.context.translate(this.width*0.17,this.height*0.17);
    this.context.beginPath();
    //context.moveTo(width/3,height/3);
    this.context.arc(this.width/3,this.height/3,this.height/3,this.arcLocations[this.chartOrder.indexOf(sign)].lastends,this.arcLocations[this.chartOrder.indexOf(sign)].lastende,false);
    this.context.lineTo(this.width/3,this.height/3);
    this.context.fillStyle = getColor((signInfo[this.chartOrder[(this.chartOrder).indexOf(sign)]].element)+type);
    this.context.fill();
    this.context.restore();

    this.createLines();
    this.addPlanets(sign);
  }
  addPlanets(sign){
    if (this.planetSigns[sign]){
      let x,y;

      let angle = (this.slice * this.chartOrder.indexOf(sign))-(this.slice*3)*0.83;
  
      x = this.cx + (this.width*0.3) * Math.sin(-angle);
      y = this.cy + (this.height*0.3) * Math.cos(-angle);
      /*context.save();
      context.translate(x,y);
      //context.rotate(angle);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.rect(0,0,20,20);
      //context.lineTo(width/3,height/3);
      
      context.fillStyle = getColor(signInfo[birthchartOrder[i]].element);
      context.fill();
      context.restore();*/
      let planets = this.planetSigns[sign].split(',');
      let xAdd = 25, yAdd = 25;
      for (var i = 0; i < planets.length; i++){
        x = this.cx + (this.width*0.33-(i*xAdd)) * Math.sin(-angle);
        y = this.cy + (this.height*0.33-(i*yAdd)) * Math.cos(-angle);
        console.log(planetInfo[planets[i]]);
        this.context.save();
        //context.translate(x,y);
        this.context.beginPath();
        //context.rotate(angle1);
        var text = planetInfo[planets[i]];
        var font = "bold 30px serif";
        this.context.font = font;
        // Move it down by half the text height and left by half the text width
        var tw = this.context.measureText(text).width;
        var th = this.context.measureText("w").width; // this is a GUESS of height
        this.context.fillText(text, (x+5),(y+10));
        this.context.restore();

      }
    }
  }
}
