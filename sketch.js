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
var cannon_ball;

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
  cannon_ball = new CannonBall(cannon.x,cannon.y)
  
 
}

function draw() {
  background(189);
 
  Engine.update(engine);
  image(bgImg,0,0,width,height)

  tower.display()
  cannon.display()
  cannon_ball.display()
}

function keyReleased(){
  if(keyCode == DOWN_ARROW){
    cannon_ball.shoot()
  }

}

