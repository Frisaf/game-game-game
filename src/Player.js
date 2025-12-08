import GameObject from './GameObject.js'
import Circle from './Circle.js'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        
        // Nuvarande hastighet (pixels per millisekund)
        this.velocityX = 0
        this.velocityY = 0

        // Rörelsehastighet (hur snabbt spelaren accelererar/rör sig)
        this.moveSpeed = 0.5
        this.directionX = 0
        this.directionY = 0
        
        this.eye_timer = 0
        this.accelerationTimer = 0.3
    }

    update(deltaTime) {
        const accelerationX = this.accelerationTimer
        const accelerationY = this.accelerationTimer

        // Styr spelaren med piltangenterna
        if (this.game.inputHandler.keys.has('ArrowUp') || this.game.inputHandler.keys.has('w')) {
            this.velocityY = -this.moveSpeed * accelerationY
            this.directionY = -1
        } else if (this.game.inputHandler.keys.has('ArrowDown') || this.game.inputHandler.keys.has('s')) {
            this.velocityY = this.moveSpeed * accelerationY
            this.directionY = 1
        } else {
            this.velocityY = 0
            this.directionY = 0
        }

        if (this.game.inputHandler.keys.has('ArrowLeft') || this.game.inputHandler.keys.has('a')) {
            this.velocityX = -this.moveSpeed * accelerationX
            this.directionX = -1
        } else if (this.game.inputHandler.keys.has('ArrowRight') || this.game.inputHandler.keys.has('d')) {
            this.velocityX = this.moveSpeed * accelerationX
            this.directionX = 1
        } else {
            this.velocityX = 0
            this.directionX = 0
        }

        // Uppdatera position baserat på hastighet
        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime

        this.eye_timer += deltaTime

        if (this.accelerationTimer <= 1 && (this.velocityX != 0 || this.velocityY != 0)) {
            this.accelerationTimer += 0.04
        }

        else if (this.accelerationTimer >= 1) {
            if (this.velocityX == 0 && this.velocityY == 0) {
                this.accelerationTimer = 0.3
            }

            else {
                this.accelerationTimer = 1

                if (this.retardationTimer >= 0) {
                    this.retardationTimer -= 0.04
                }

                else {
                    this.retardationTimer = 0
                }
            }
        }
    }

    draw(ctx) {
        // Rita spelaren som en rektangel
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        let x_modifier1 = 0.3
        let x_modifier2 = 0.7

        if (this.eye_timer >= 1500 && this.velocityX == 0 && this.velocityY == 0) {
            x_modifier1 = 0.35
            x_modifier2 = 0.75
        }

        if (this.eye_timer >= 2000) {
            this.eye_timer = 0
        }

        // Rita ögon
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x + this.width * 0.2, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.2)
        ctx.fillRect(this.x + this.width * 0.6, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.2)
        
        // Rita pupiller
        ctx.fillStyle = "black"
        ctx.beginPath()
        ctx.arc(this.x + this.width * x_modifier1 + this.directionX * this.width * 0.05, this.y + this.height * 0.3 + this.directionY * this.width * 0.05, this.width * 0.08, 0, Math.PI * 2)
        ctx.fill()

        ctx.beginPath()
        ctx.arc(this.x + this.width * x_modifier2 + this.directionX * this.width * 0.05, this.y + this.height * 0.3 + this.directionY * this.width * 0.05, this.width * 0.08, 0, Math.PI * 2)
        ctx.fill()

        // ctx.fillRect(
        //     this.x + this.width * 0.25 + this.directionX * this.width * 0.05, 
        //     this.y + this.height * 0.25 + this.directionY * this.width * 0.05, 
        //     this.width * 0.1, 
        //     this.height * 0.1
        // )
        // ctx.fillRect(
        //     this.x + this.width * 0.65 + this.directionX * this.width * 0.05, 
        //     this.y + this.height * 0.25 + this.directionY * this.width * 0.05, 
        //     this.width * 0.1, 
        //     this.height * 0.1
        // )

        // rita mun som ett streck
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.beginPath()
        // ctx.moveTo(this.x + this.width * 0.3, this.y + this.height * 0.65)
        // ctx.lineTo(this.x + this.width * 0.7, this.y + this.height * 0.65)

        if (this.velocityX != 0 || this.velocityY != 0) {
            ctx.arc(this.x + this.width * 0.5, this.y + this.height * 0.58, this.width * 0.15, 0, Math.PI) // happy
        }

        else {
            ctx.arc(this.x + this.width * 0.5, this.y + this.height * 0.7, this.width * 0.15, Math.PI, 0) // sad
        }
        
        ctx.stroke()
    }
}