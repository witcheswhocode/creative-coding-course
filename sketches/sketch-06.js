const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 1080, 1080 ],
  animate: true
};

let manager;
let fontFamily = 'serif';
let canvasImg;
const url = 'flower.jpeg';
const loadImg = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    console.log(url);
    img.src = url;
  });
}
const start = async () => {
  //manager = await canvasSketch(sketch, settings);
  try {
    canvasImg = await loadImg(url);
  }catch(e) {
    console.log(e);
  }

  console.log(canvasImg);
  canvasSketch(sketch, settings);
};
let text = canvasImg;

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width/cell);
  const rows = Math.floor(height/cell);
  const numCells = cols * rows;
  const isize = 0.05;
  let fontSize = cols/2;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = 'black';
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.fillStyle = 'white';
    typeContext.font = `${fontSize}px ${fontFamily}`;
    typeContext.textBaseline = 'top';


		/*const metrics = typeContext.measureText(text);
		const mx = metrics.actualBoundingBoxLeft * -1;
		const my = metrics.actualBoundingBoxAscent * -1;
		const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
		const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log(metrics);

    const tx = (cols - mw) * 0.5 - mx;
    const ty = (rows - mh) * 0.5 - my;*/
    var hRatio = width / canvasImg.width    ;
    var vRatio = height / canvasImg.height  ;
    var ratio  = Math.min ( hRatio, vRatio );
    console.log(canvasImg.height)

    typeContext.save();
    typeContext.translate(0,0);

    typeContext.beginPath();
    typeContext.stroke();
    typeContext.drawImage(canvasImg, 0,0, width*isize,height*isize);
    typeContext.restore();


    //const typeData = typeContext.getImageData(0,0,cols,rows).data;
    const typeData = typeContext.getImageData(0,0,cols,rows).data;

    //context.drawImage(typeCanvas,0,0);

    context.fillStyle = 'black';
    context.fillRect(0,0,width,height);

    context.textBaseline = 'middle';
    context.textAlign = 'center';
    for (let i = 0; i < numCells; i++){
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell;
      const y = row * cell;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(b);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillStyle = `rgb(${r},${g},${b})`;

      context.save();
      context.translate(x,y);
      context.translate(cell*0.5,cell*0.5); // fix circles
      context.fillText(glyph,0,0);

      context.restore();
    }
  };
};

const getGlyph = (v) => {
  if (v < 50) return 'l';
  if (v < 100) return 'o';
  if (v < 105) return 't';
  if (v < 200) return 'u';
  if (v < 250) return 's';

  const glyphs = '_* /'.split('');

  return random.pick(glyphs);
}

/*const onKeyUp = (e) => {
  text = e.key;
  manager.render();
}*/

//document.addEventListener('keyup', onKeyUp);

start();