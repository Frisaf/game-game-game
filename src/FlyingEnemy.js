import GameObject from "./GameObject"
import flyingSprite from "./assets/Pixel Adventure 1/Main Characters/Virtual Guy/Idle (32x32).png"

export default class FlyingEnemy extends GameObject {
    constructor(game, x, y, width, height, patrolDistance = null) {
        super(game, x, y, width, height)
        this.color = "orange"
        this.velocityX = 0

        this.startX = x
        this.patrolDistance = patrolDistance
        this.endX = patrolDistance !== null ? x + patrolDistance : null
        this.speed = 0.1
        this.direction = 1 // 1 = höger, -1 = vänster
        
        this.damage = 2 // Hur mycket skada fienden gör

        this.bobOffset = 0
        this.bobSpeed = 0.04 // hur snabbt fienden gungar
        this.bobDistance = 10 // hur långt upp/ner fienden rör sig

        this.loadSprite("fly", flyingSprite, 11, 80)
    }

    update(deltaTime) {
        this.velocityX = this.speed * this.direction
            
            // Om vi har en patrolldistans, vänd vid ändpunkter
        if (this.patrolDistance !== null) {
            if (this.x >= this.endX) {
                this.direction = -1
                this.x = this.endX
            } else if (this.x <= this.startX) {
                this.direction = 1
                this.x = this.startX
            }
        }

        this.bobOffset += this.bobSpeed * deltaTime
        this.x += this.velocityX * deltaTime
        this.y += this.bobSpeed * deltaTime

        this.setAnimation("fly")
        this.updateAnimation(deltaTime)
    }

    handlePlatformCollision(platform) {
        const collision = this.getCollisionData(platform)
        
        if (collision) {
            if (collision.direction === 'top' && this.bobSpeed > 0) {
                // Fienden landar på plattformen
                this.y = platform.y - this.height
                this.bobSpeed *= -1
            } else if (collision.direction === 'bottom' && this.bobSpeed < 0) {
                // Fienden träffar huvudet
                this.y = platform.y + platform.height
                this.bobSpeed *= -1
            } else if (collision.direction === 'left' && this.velocityX > 0) {
                // Fienden träffar vägg - vänd
                this.x = platform.x - this.width
                this.direction = -1
            } else if (collision.direction === 'right' && this.velocityX < 0) {
                // Fienden träffar vägg - vänd
                this.x = platform.x + platform.width
                this.direction = 1
            }
        }
    }

    handleEnemyCollision(otherEnemy) {
        if (this.intersects(otherEnemy)) {
            this.direction *= -1
        }
    }

    handleScreenBounds(gameWidth) {
        // Vänd vid skärmkanter (för fiender utan patrolDistance)
        if (this.patrolDistance === null) {
            if (this.x <= 0) {
                this.x = 0
                this.direction = 1
            } else if (this.x + this.width >= gameWidth) {
                this.x = gameWidth - this.width
                this.direction = -1
            }
        }

        if (this.y < 0) {
            this.bobSpeed *= -1
        }
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        const spriteDrawn = this.drawSprite(ctx, camera, this.direction === -1)

        
        if (!spriteDrawn) {
            // Rita fienden som en röd rektangel
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)
        }
    }
}