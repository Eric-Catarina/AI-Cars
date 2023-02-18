class Car{
    constructor(positionX, positionY, width, height){
        this.x = positionX;
        this.y = positionY;
        this.width = width;
        this.height = height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction =0.04;
        this.angle = 0

        this.controls = new Controls()
    }

    accelerateForward(){
        if (this.controls.forward){
            this.speed+=this.acceleration;
        }
    }
    accelerateBackward(){
        if (this.controls.reverse){
            this.speed-=this.acceleration;
        }
    }

    goForward(){
        this.x-=Math.sin(this.angle)*this.speed;
    }

    goBackward(){
        this.y-=Math.cos(this.angle)*this.speed;
    }

    capSpeedForward(){
        if (this.speed > this.maxSpeed){
            this.speed = this.maxSpeed
        }
    }

    capSpeedBackward(){
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
    }

    controlFriction(){
        if (this.speed>0){
            this.speed -= this.friction
        }
        if (this.speed<0){
            this.speed += this.friction
        }
        if (Math.abs(this.speed)<this.friction){
            this.speed = 0
        }
    }

    controlRotation(){
        if (this.speed!=0){
            const flip=this.speed>0?1:-1;
            if (this.controls.left){
                this.angle+=0.03*flip;
            }
            if (this.controls.right){
                this.angle-=0.03*flip;
            }
        }
    }

    update(){
        
        this.accelerateForward()
        this.accelerateBackward()

        this.capSpeedForward()
        this.capSpeedBackward()

        this.controlFriction()
    
        this.controlRotation()

        this.goForward()
        this.goBackward()
    }


    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);  
        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        )
        ctx.fill()

        ctx.restore()
    }
}