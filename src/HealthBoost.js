import GameObject from "./GameObject"

export default class HealthBoost extends GameObject {
    constructor(game, x, y, size, healing) {
        super(game, x, y)

        this.healing = healing || 1
        this.size = size || 15

        this.color = "lightgreen"

        this.bobOffset = 0
        this.bobSpeed = 0.009
        this.bobDistance = 5
    }

    update(deltaTime) {
        this.bobOffset += this.bobSpeed * deltaTime
    }

    draw(ctx) {
        const bobY = Math.sin(this.bobOffset) * this.bobDistance

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x + this.size / 2, this.y + this.size / 2 + bobY, this.size / 2, 0, Math.PI * 2)
        ctx.fill()
    }
}