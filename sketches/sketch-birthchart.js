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
}
const signs = ['sun', 'moon', 'asc', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto', 'northnode', 'chiron', 'mc' ];
const signOrder = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const lizBirthChart = {
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
}

const degToRad = (degrees) =>{
  return degrees / 180 * Math.PI
}
const randomRange = (min,max) =>{
  return Math.random()*(max-min)+min;
}

const getColor = (element) =>{
    switch (element){
      case 'fire':
        return '#FFA8A2';
      case 'earth':
        return '#ABD781';
      case 'water':
        return '#6FC0CB';
      case 'air':
        return '#FAF6F8';
      case 'fireActive':
        return '#FE5F55';
      case 'earthActive':
        return '#669D31';
      case 'waterActive':
        return '#28666E';
      case 'airActive':
        return '#F0E2E7';
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
  const birthchart = new Birthchart(lizBirthChart);
  console.log(birthchart.getAscendent());
  const birthchartOrder = birthchart.sortSignOrderToGenerateChart();
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);
    const magenta = '#FF00FF';
    var gradient = context.createLinearGradient(0, 0, 500, 500);
    gradient.addColorStop("0", "magenta");
    gradient.addColorStop("1" ,"blue");

    context.fillStyle = '#2B3A67';


    const cx = width * 0.5;
    const cy = height * 0.5;
    const w = width * 0.007;
    const h = height * 0.4;

    const num = 12;
    const radius = width * 0;
    const slice = degToRad(360/num);
    let x,y;

    

    //var canvas = document.getElementById("can");
    //var ctx = canvas.getContext("2d");
    var lastend = 0; // angle start
    var lastend1 = 15; // angle start
    var sizeSlice = 10;
    var myTotal = sizeSlice*num;
    const slice1 = degToRad((360/num));

    for (var i = 0; i < num; i++) {
      //if (i%random.rangeFloor(1,5)) {
      context.save();
      context.translate(width*0.17,height*0.17);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.arc(width/3,height/3,height/3,lastend,lastend+(Math.PI*2*(sizeSlice/myTotal)),false);
      context.lineTo(width/3,height/3);
      context.fillStyle = getColor(signInfo[birthchartOrder[i]].element);
      context.fill();
      context.restore();

      //}


      let angle = (slice1 * i)-(slice1*3)*0.85;
      //console.log(angle);

      x = cx + (width*0.4) * Math.sin(-angle);
      y = cy + (height*0.4) * Math.cos(-angle);
      context.save();
      //context.translate(x,y);
      context.beginPath();
      //context.rotate(angle1);
      var text = birthchartOrder[i];
      var font = "bold 12px serif";
      context.font = font;
      // Move it down by half the text height and left by half the text width
      var tw = context.measureText(text).width;
      var th = context.measureText("w").width; // this is a GUESS of height
      context.fillText(text, (x) + (tw/2),(y) + (th/2));

      context.restore();

      lastend += Math.PI*2*(sizeSlice/myTotal);
    }


    for (let i = 0; i < num; i++){
      let angle = (slice * i)-(slice*3);

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);
      //console.log("points: "+x +" "+y);

      //console.log(angle);
      context.save();
      context.translate(x+w/2,y+w/2);
      context.rotate(angle);
  
      context.beginPath();
      context.rect(-w*0.5,1,w,h);
      context.fillStyle = '#2B3A67';
      context.fill();
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

    /*for(let i = 0; i<num;i++){

      let angle = (slice1 * i)-(slice1*3)*0.8;
      console.log(angle);

      x = cx + (width*0.3) * Math.sin(-angle);
      y = cy + (height*0.3) * Math.cos(-angle);
      context.save();
      context.translate(x,y);
      //context.rotate(angle);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.rect(0,0,20,20);
      //context.lineTo(width/3,height/3);
      
      context.fillStyle = myColor[i];
      context.fill();
      context.restore();

      context.save();
      //context.translate(x,y);
      context.beginPath();
      //context.rotate(angle1);
      var text = planetInfo['sun'];
      var font = "bold 30px serif";
      context.font = font;
      // Move it down by half the text height and left by half the text width
      var tw = context.measureText(text).width;
      var th = context.measureText("w").width; // this is a GUESS of height
      context.fillText(text, (x)-10,(y)+10);

      context.restore();
      lastend1 += Math.PI*2*(sizeSlice/myTotal);
    }*/

    for(let i = 0; i<num;i++){

      let angle = (slice1 * i)-(slice1*3)*0.82;
      //console.log(angle);

      x = cx + (width*0.13) * Math.sin(-angle);
      y = cy + (height*0.13) * Math.cos(-angle);
      /*context.save();
      context.translate(x,y);
      //context.rotate(angle);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.rect(0,0,20,20);
      //context.lineTo(width/3,height/3);
      
      context.fillStyle = 'black';
      context.fill();
      context.restore();*/

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

    }
  };
};

canvasSketch(sketch, settings);

class Birthchart {
  constructor(array){
    for (var i = 0; i < signs.length; i++){
      this[signs[i]] = array[signs[i]];
    }
  }
  sortSignOrderToGenerateChart(){ // asc should be the sixth item in the list
    var sisterIndex = signOrder.indexOf(signInfo[this.getAscendent()]['sister']);
    console.log(sisterIndex);
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
  /*getPlanetLocations(){
    var arr = [];
    for (var i = 0; i < signs.length; i++){
      for (var j = 0; j < signs.length; j++){
        if (this.signs[j] == signs[i]){

        }
      }
    }
  }*/
  getAscendent(){
    return this.asc;
  }
  highlightArc(sign){

  }
  addPlanets(context){
    for(let i = 0; i<num;i++){

      let angle = (slice1 * i)-(slice1*3)*0.8;
      console.log(angle);

      x = cx + (width*0.3) * Math.sin(-angle);
      y = cy + (height*0.3) * Math.cos(-angle);
      context.save();
      context.translate(x,y);
      //context.rotate(angle);
      context.beginPath();
      //context.moveTo(width/3,height/3);
      context.rect(0,0,20,20);
      //context.lineTo(width/3,height/3);
      
      context.fillStyle = getColor(signInfo[birthchartOrder[i]].element);
      context.fill();
      context.restore();

      context.save();
      //context.translate(x,y);
      context.beginPath();
      //context.rotate(angle1);
      var text = planetInfo['sun'];
      var font = "bold 30px serif";
      context.font = font;
      // Move it down by half the text height and left by half the text width
      var tw = context.measureText(text).width;
      var th = context.measureText("w").width; // this is a GUESS of height
      context.fillText(text, (x)-10,(y)+10);

      context.restore();
      lastend1 += Math.PI*2*(sizeSlice/myTotal);
    }
  }
}
