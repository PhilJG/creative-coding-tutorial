const canvasSketch = require('canvas-sketch');
const math =require(`canvas-sketch-util/math`);
const random = require(`canvas-sketch-util/random`);

const settings = {
  dimensions: [ 1080, 1080 ]
};

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}

const randomRange = (min,max) => {
  return Math.random() * (max - min) + min;
}

const randomColor = Math.floor(Math.random()*16777215).toString(16);

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = randomColor();
    
    const cx = width * 0.5;
    const cy = height * 0.5

    const w = width * 0.01
    const h = height * 0.1;

    let x,y;

    const num = random.range(12 , 40);
    const radius = width * 0.3;
    //outer pupil
    context.save();
    //set location of circle
    context.translate(540, 540);

    // draw circle
    context.beginPath();
    context.arc(0,0, 430, 0, Math.PI * 2);
    context.fillStyle = '#723380'
    context.fill();
    context.lineWidth = 20;
    context.strokeStyle = 'green'
    context.stroke();
    context.restore();

    for(let i = 0; i < num; i++){
      const slice = degToRad(360 / num);
      const angle = slice * i;
 
       x = cx + radius * Math.sin(angle)
       y = cy + radius * Math.cos(angle)
 
       context.save(); 
       context.translate(x, y);
       context.rotate(-angle);
       context.scale(random.range(0.2, 1), random.range(0.2, 1));
   
       //Trigonometery: relationship between sides and angles on triangles
       //https://ramesaliyev.com/trigonoparty/
       
       //draw rectangle
       context.beginPath()
       context.rect(-w * 0.5,random.range(0, -h * 0.5), w, h)
       context.fill();
       context.restore();
 
       context.save();
       context.translate(cx, cy);
       context.rotate(-angle);
       
       context.lineWidth = random.range(5,20);
 
       context.beginPath();
       context.arc(0,  0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1,5));
       context.stroke();
       context.restore();
     }
    //inner pupil
  context.save();
    //set location of circle
    context.translate(540, 540);
     context.strokeStyle = 'red';
    // draw circle
    context.beginPath();
    context.arc(0,0, random.range(50, 150), 0, Math.PI * 2);
    context.fill();
    context.restore();


  };
};


canvasSketch(sketch, settings);

