import GameObject from './GameObject.js'

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height)
        this.color = color
        
        // Nuvarande hastighet (pixels per millisekund)
        this.velocityX = 0
        this.velocityY = 0

        // Rörelsehastighet (hur snabbt spelaren accelererar/rör sig)
        this.moveSpeed = 0.3
        this.directionX = 0
        this.directionY = 0

        // Fysik egenskaper
        this.jumpPower = -0.6 // negativ hastighet för att hoppa uppåt
        this.isGrounded = false // om spelaren står på marken
        this.isTouchingWall = false

        this.jumpCount = 0
        this.maxJump = 2

        this.hasDashed = false
        this.dashSpeed = 4
        this.dashDuration = 200
        this.dashCooldown = 501
    }

    update(deltaTime) {
        // Horisontell rörelse
        if (this.game.inputHandler.keys.has('a')) {
            this.velocityX = -this.moveSpeed
            this.directionX = -1

        } else if (this.game.inputHandler.keys.has('d')) {
            this.velocityX = this.moveSpeed
            this.directionX = 1

        } else {
            this.velocityX = 0
            this.directionX = 0
        }

        // Hopp
        if (this.game.inputHandler.keys.has(' ') && this.jumpCount < this.maxJump && (this.isGrounded || !this.isGrounded || this.isTouchingWall)) {
            this.isGrounded = false
            this.velocityY = this.jumpPower
            this.jumpCount += 1

            if (this.isTouchingWall) {
                this.jumpCount = 0
            }

            this.game.inputHandler.keys.delete(" ")
        }

        this.spacePressed = false

        if (this.isGrounded == true) {
            this.jumpCount = 0
        }

        if (this.game.inputHandler.keys.has("Shift") && this.hasDashed === false && this.dashCooldown === 501) {
            this.velocityX = this.directionX * this.dashSpeed
            this.hasDashed = true
            this.dashTimer = this.dashDuration
            this.dashCooldown -= 1
        }

        if (this.hasDashed == true) {
            this.dashTimer -= deltaTime

            if (this.dashTimer <= 0) {
                this.hasDashed = false
                this.velocityX = 0
            }
        }

        if (this.dashCooldown <= 500) {
            this.dashCooldown -= deltaTime

            if (this.dashCooldown <= 0) {
                this.dashCooldown = 501
            }
        }

        // Applicera gravitation
        this.velocityY += this.game.gravity * deltaTime
        
        // Applicera luftmotstånd (friktion)
        if (this.velocityY > 0) {
            this.velocityY -= this.game.friction * deltaTime
            if (this.velocityY < 0) this.velocityY = 0
        }

        // Sätt directionY baserat på vertikal hastighet för ögonrörelse
        if (this.velocityY < -0.1) {
            this.directionY = -1 // tittar upp när man hoppar
        } else if (this.velocityY > 0.1) {
            this.directionY = 1 // tittar ner när man faller
        } else {
            this.directionY = 0
        }

        // Uppdatera position baserat på hastighet
        this.x += this.velocityX * deltaTime
        this.y += this.velocityY * deltaTime
    }

    draw(ctx) {
        // Rita spelaren som en rektangel
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        // Rita ögon
        ctx.fillStyle = 'white'
        ctx.fillRect(this.x + this.width * 0.2, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.2)
        ctx.fillRect(this.x + this.width * 0.6, this.y + this.height * 0.2, this.width * 0.2, this.height * 0.2)
        
        // Rita pupiller
        ctx.fillStyle = 'black'
        ctx.fillRect(
            this.x + this.width * 0.25 + this.directionX * this.width * 0.05, 
            this.y + this.height * 0.25 + this.directionY * this.width * 0.05, 
            this.width * 0.1, 
            this.height * 0.1
        )
        ctx.fillRect(
            this.x + this.width * 0.65 + this.directionX * this.width * 0.05, 
            this.y + this.height * 0.25 + this.directionY * this.width * 0.05, 
            this.width * 0.1, 
            this.height * 0.1
        )
        // rita mun som ett streck
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(this.x + this.width * 0.3, this.y + this.height * 0.65)
        ctx.lineTo(this.x + this.width * 0.7, this.y + this.height * 0.65)
        ctx.stroke()
    }
}