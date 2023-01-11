
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
var boatAnimation = [];
var boatData
var boatSprite
var boatBrokenAnimation = []
var boatBrokenSprite
var boatBrokenData
var bgMusic
var explosion
var water
var pirate
var isGameOver = false
var isLaugh = false
var score = 0
var waterSprite
var waterAnimation = []

function preload() {
  bgImg = loadImage("./assets/background.gif")
  boatSprite = loadImage("./assets/boat/boat.png")
  boatData = loadJSON("./assets/boat/boat.json")
  waterData = loadJSON ("./assets/water_splash/water_splash.json")
  waterSprite = loadImage("./assets/water_splash/water_splash.png")
  boatBrokenData = loadJSON("./assets/boat/broken_boat.json")
  boatBrokenSprite = loadImage("./assets/boat/broken_boat.png")
  bgMusic = loadSound("./assets/sounds/background_music.mp3")
  explosion = loadSound("./assets/sounds/cannon_explosion.mp3")
  water = loadSound("./assets/sounds/cannon_water.mp3")
  pirate = loadSound("./assets/sounds/pirate_laugh.mp3")
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
  
  //extrair animação do barco
  var boatFrames = boatData.frames
  for (let i = 0; i < boatFrames.length; i++) {
    var pos = boatFrames[i].position
    var img = boatSprite.get(pos.x, pos.y, pos.w, pos.h)
    boatAnimation.push(img)
  }

  var boatBrokenFrames = boatBrokenData.frames
  for (let i = 0; i < boatBrokenFrames.length; i++) {
    var pos = boatBrokenFrames[i].position
    var img = boatBrokenSprite.get(pos.x, pos.y, pos.w, pos.h)
    boatBrokenAnimation.push(img)
  }
 
  var waterFrames = waterData.frames
  for (let i = 0; i < waterFrames.length; i++) {
    var pos = waterFrames[i].position
    var img = waterSprite.get(pos.x, pos.y, pos.w, pos.h)
    waterAnimation.push(img)
  }
}

function draw() {
  background(189);

  if (!bgMusic.isPlaying()) {
    bgMusic.play()
  bgMusic.setVolume(0.3)
  }
 
  Engine.update(engine);
  image(bgImg,0,0,width,height)

  tower.display()
  
  //cannon_ball.display();
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i)
    collisionWithBoats(i);
    
  }
  cannon.display()
  showBoats()

  fill("#6d4c41");
  textSize(40);
  text(`Pontuação: ${score}`, width - 200, 50);
  textAlign(CENTER, CENTER);
}


function keyReleased(){
  if(keyCode == DOWN_ARROW){
   balls[balls.length -1].shoot()
   explosion.play()
   explosion.setVolume(0.3)
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
  

    if (!balls[index].isSink) {
      water.play()
      water.setVolume(0.3)
    }

    balls[index].removeBalls(index)
    balls[index].animate()
  }
}

function showBoats() {

  if (boats.length > 0) {
    
    if (boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300) {
      var positions = [-130,-100,-120,-80,-20]
      var position = random(positions)
      var boat = new Boats(width, height - 100, 200, 200, position, boatAnimation)
      boats.push(boat)
      
    }

    for (var i = 0; i < boats.length; i++) {
      Body.setVelocity(boats [i].body, {x: -0.9, y:0});

      boats [i].display()
      boats[i].animate()
      var collision = Matter.SAT.collides(tower.body, boats[i].body)
      if (collision.collided) {

        if (!isLaugh) {
          pirate.play()
          isLaugh = true
        }
        isGameOver = true
        gameOver()

      }
    }
    
  } else { 
    var boat = new Boats(width, height - 100, 200, 200, -100, boatAnimation)
    boats.push(boat)
  }
}

function collisionWithBoats(index) {
  for (let i = 0; i < boats.length; i++) {
    if (balls[index] !== undefined && boats[i] !== undefined) {
      var collision = Matter.SAT.collides(balls[index].body, boats[i].body)

      if (collision.collided) {
        Matter.World.remove(world,balls[index].body)
        balls.splice(index,1)
        boats[i].removeBoats(i)
        score += 5
        
        
      }
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Fim de Jogo!!!`,
      text: "Obrigada por jogar!!",
      imageUrl:
        "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize: "150x150",
      confirmButtonText: "Jogar Novamente"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}





