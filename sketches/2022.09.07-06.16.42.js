//Create new sketch in terminal: canvas-sketch -sketch-name --new --open

const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.fillStyle = 'black';
    
    const x = width * 0.5;
    const y = height * 0.5
    const w = width * 0.3
    const h = height * 0.3

    //without ranslate call it is like rotating the paper and then the pen (the orifin stays the same)

    context.save(); 
    context.translate(x, y);
    context.rotate(0.3);

    //draw rectangle
    context.beginPath()
    context.rect(-w * 0.5, -h * 0.5, w, h)
    context.fill();
    context.restore();

    //reset context with save() and restore() 

    //set location of circle
    context.translate(100, 400);

    // draw circle
    context.beginPath();
    context.arc(0,0, 50, 0, Math.PI * 2);
    context.fill();
  };
};

canvasSketch(sketch, settings);
