class Cannon{
    constructor(x,y,w,h,a){
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.a = a

        this.baseimg = loadImage("./assets/cannonBase.png")
        this.cannonimg = loadImage("./assets/canon.png")


    }
    display(){
        console.log(this.a)

        if (keyIsDown(RIGHT_ARROW) && this.a<20.2){
            this.a +=0.02
        }
        if (keyIsDown(LEFT_ARROW) && this.a>18.2){
            this.a -=0.02
        }
    
        //cano do canhão
        push()
        imageMode(CENTER)
        translate(this.x,this.y)
        rotate(this.a)
        image(this.cannonimg,0, 0 ,this.w,this.h)
        pop()


         //base do canhão
        image(this.baseimg,60,20,200,200)

    }



    
}