const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')
const math = require('canvas-sketch-util/math')


const settings = {
  //to animate multiple frames need to be added
  dimensions: [ 1080, 1080 ],
  animate: true
};

const animate = () => {
  console.log('animate');
  requestAnimationFrame(animate)
};

// animate();

const sketch = ({context, width, height}) => {
const agents = [];

for (let i = 0; i < 40; i++) {
  const x = random.range(0, width);
  const y = random.range(0, height);

  agents.push(new Agent(x,y));
}

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    for(let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      context.strokeStyle = 'black'
      //for each agent we go over ever other agent
      for(let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        // if distance is larger than 200 skip it
        if( dist > 200) continue;

        // continue means goe to next iteration of the loop
        // thins outlines when distance is 0 width is 12. when it is 200 it thins to 1
        
        context.beginPath();
        // start of line
        context.moveTo(agent.pos.x, agent.pos.y);
        // end of line
        context.lineTo(other.pos.x, other.pos.y);
        context.strokeStyle = 'red'
        context.stroke();
        // context.lineWidth = math.mapRange(dist, 0, 200, '#ff0000', 1);
        
        //currently their are 40 agents so that is 40*40 connections = 1600 iterations on ever frame
      }
    }

    agents.forEach(agent => {
      agent.update();
      agent.draw(context);
      // agent.bounce(width, height)
      agent.wrap(width, height)

      });
    };
  };
  
  canvasSketch(sketch, settings);

  //   const agentA = new Agent(800, 400);
  //   const agentB = new Agent(300, 700);
    
  //  agentA.draw(context);
  //  agentB.draw(context);

class Vector {
  constructor(x, y){
    // setting the parameter kind of like declaring a variable
    this.x = x;
    this.y = y;
  }

  //Pythagorem therom
  //v = "other vector"
  getDistance(v) {
    //this vector minus "other" vector
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    //return actual distance
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Vector(x, y);
    // vel = velocity
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(4, 12);
  }

  // bounce(width, height) {
  //   //if position of x/y is less than or equal to 0 OR greater than width/height than invert velocity
  //   if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
  //   if (this.pos.y <= 0 || this.pos.y >= height) this.vel.y *= -1;
  // }

  wrap(width, height) {
    // When the agent reaches one side of the canvas, it should wrap around and appear on the opposite side.
    // Hint: if (pos.x > width) pos.x = 0;
    if (this.pos.x <= 0 || this.pos.x >= width) this.pos.x = 0;
    if (this.pos.y <= 0 || this.pos.y >= height) this.pos.y = 0;
  }


  //update adds velocity to the position
  update(){
    this.pos.x += this.vel.x
    this.pos.y += this.vel.y
  }

  //pos.parameter == new Vector and its parameter 
  //context is referenced in parameter
  draw(context) {

    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.lineWidth = 4;

    context.beginPath();
// radius does not need a pos
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    context.restore()
  }
}