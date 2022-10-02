const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [ 1080, 1080 ]
};

const sketch = ({context, width, height}) => {
const agents = [];

for (let i = 0; i < 40; i++) {
  const x = random.range(0, width);
  const y = random.range(0, height);

  agents.push(new Agent(x,y));
}

  return ({ context, width, height }) => {
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);

    agents.forEach(agent => {
      agent.draw(context);
      });
    };
  };
  
  canvasSketch(sketch, settings);

  //   const agentA = new Agent(800, 400);
  //   const agentB = new Agent(300, 700);
    
  //  agentA.draw(context);
  //  agentB.draw(context);

class Point {
  constructor(x, y){
    // setting the parameter kind of like declaring a variable
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y){
    this.pos = new Point(x, y);
    this.radius = 10;
  }

  //pos.parameter == new Point and its parameter 
  //context is referenced in parameter
  draw(context) {
    context.fillStyle = 'white';

    context.beginPath();
// radius does not need a pos
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
//     //two instances of the same point class(x&y axis & radius). With Agent class is removed because it is stnadard within the class 
//     const agentA = new Agent(800, 400);
//     const agentB = new Agent(300, 700);

//     // function within the Agent class is called
//     agentA.draw(context)
//     agentB.draw(context)
    
//   };
// };

//   canvasSketch(sketch, settings);

//   class Point {
//     constructor(x, y){
//         this.x = x;
//         this.y = y;
//       }
//   }

//   //to seperate point from dot on canvas. Dot could be more than an entity with more than just a position and radius. To do this we create another class
//   class Agent {
//     constructor(x, y){
//       this.pos = new Point(x, y)
//       //radius is declared here so isnt needed in parameters
//       this.radius = 10;
//     }
//     //move the draw context into the class as a function
//     // context is referenced in the parameter
//     draw(context){
//       context.fillStyle = 'black';

//       context.beginPath();
//       context.arc(this.pos.x, this.pos.y, this.pos.radius, 0, Math.PI * 2);
//       context.fill();
//     }
//   }
  