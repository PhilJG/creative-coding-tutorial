const canvasSketch = require('canvas-sketch');
const math = require(`canvas-sketch-util/math`);
const random = require(`canvas-sketch-util/random`);

const settings = {
  dimensions: [ 1080, 1080 ],
  // animate: true,
 
};

const animate = () => {
  console.log('animate');
  requestAnimationFrame(animate)
};

animate()

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    
    let randomColor = getRandomColor()
    let randomStrokeColor = getRandomColor()
    let randomRange = random.range(50, 190)
    //outer pupil
    context.save();
    //pw/ph = pupil width & height location. 
    // rw/rh = rectangle width and height location
    function drawPupil(pw, ph, rw, rh){
      let x,y;
      
      const num = random.range(500 , 2000);
      const radius = width * 0.3;
      
      const cx = width * rw;
      const cy = height * rh
  
      const w = width * 0.01
      const h = height * 0.1;
      context.translate(pw, ph);

    // draw circle
    context.beginPath();
    context.arc(0,0, 430, 0, Math.PI * 2);
    context.fillStyle = randomColor;
    context.fill();
    context.lineWidth = 20;
    context.strokeStyle = randomStrokeColor
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
       context.rect(-w * 5,random.range(0, -h * 2), w, h)
       context.fillStyle = randomStrokeColor
       context.fill();
       context.restore();
       
       context.save();
       context.translate(cx, cy);
       context.rotate(-angle);
       
       context.lineWidth = random.range(5,20);
       
       context.beginPath();
       context.arc(0,  0, radius * random.range(0.1, 1.3), slice * random.range(1, -8), slice * random.range(1,5));
       context.strokeStyle = randomStrokeColor;
       context.stroke();
       context.restore();
      }
      //inner pupil
      context.save();
      //set location of circle
      context.translate(pw, ph);
      // draw circle
      context.beginPath();
      context.arc(0,0, randomRange, 0, Math.PI * 2);
      context.fill();
      context.restore();
      
          }
          //(pw, ph, rw, rh)
      drawPupil(540, 540, 0.5, .5)
    // drawPupil(0, 540, 0, .5)
    // drawPupil(1080, 540, 1, .5) 

  };
};


canvasSketch(sketch, settings);

