const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body

let engine, world;

var ground;
var bgImg;
var tower;
var cannon;
var angle;
var balls = []
var boats = [];

function preload() {
  bgImg = loadImage("./assets/background.gif")
}

function setup() {

  canvas = createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  tower = new Tower(150,350,160,310)
  angle = 20
  cannon = new Cannon(180,110,130,100,angle)

  

  ground = Bodies.rectangle(0,height-1,width*2,1,{isStatic:true})
  World.add(world,ground)
  
  
 
}

function draw() {
  background(189);
 
  Engine.update(engine);
  image(bgImg,0,0,width,height)

  tower.display()
  
  //cannon_ball.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
    
  }
  cannon.display()
  showBoats()
}


function keyReleased(){
  if(keyCode == DOWN_ARROW){
   balls[balls.length -1].shoot()
  }
}
function keyPressed(){
  if(keyCode == DOWN_ARROW){
    var cannon_ball = new CannonBall(cannon.x,cannon.y)
    balls.push(cannon_ball)
  }
}

function showCannonBalls (ball,index) {
  ball.display()

  if (ball.body.position.x > width) {
    World.remove(world,ball.body)
    balls.splice(index, 1)
  }

  if (ball.body.position.y > height - 50) {
    World.remove(world,ball.body)

    balls.splice(index, 1)
  }
}

function showBoats() {

  if (boats.length > 0) {
    
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-130,-100,-120,-80,-20]
      var position = random(positions)
      var boat = new Boats(width, height - 100, 200, 200, position)
      boats.push(boat)
      
    }

    for (var i = 0; i < boats.length; i++) {
      Body.setVelocity(boats [i].body, {x: -0.9, y:0})
  
      boats [i].display()
    }
    
  } else { 
    var boat = new Boats(width, height - 100, 200, 200, -100)
    boats.push(boat)
  }

  
}



