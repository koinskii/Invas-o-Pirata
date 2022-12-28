class CannonBall {
    constructor(x,y){

        this.x = x
        this.y = y
        this.r = 30
        this.image = loadImage("./assets/cannonball.png")
        
        var opitions = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,
            isStatic:true

        }
        this.body = Bodies.circle(this.x,this.y,this.r,opitions)
        World.add(world, this.body)
    }
    display(){
        var pos = this.body.position
        var angle = this.body.angle
        push()
        imageMode(CENTER)
        translate(pos.x,pos.y)
        rotate(angle)
        image(this.image,0,0,this.r,this.r)
        pop()

    }
    shoot(){
        //covertendo o angulo em graus
        var newAngle = cannon.a * (180/3.14)
        newAngle = newAngle - 28
        //convertendo o angulo para radiano
        newAngle = newAngle * (3.14/180)
        var velocity = p5.Vector.fromAngle(newAngle)
        //velocity = velocity*20
       // velocity *= 20
       velocity.mult(30)
        Body.setStatic(this.body,false)
        Body.setVelocity(this.body,{x:velocity.x, y:velocity.y})


    }


}