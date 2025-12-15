import Platform from "./Platform"

export default class MovingPlatform extends Platform {
    constructor(game, x, y, width, height, endValue, axis, velocity, color = "#8B4513") {
        super(game, x, y, width, height, color)

        this.endValue = endValue
        this.axis = axis
        this.startValueX = this.x
        this.startValueY = this.y
        this.direction = "right" ? this.axis === "x" : "up"
        this.velocity = velocity
    }

    draw(ctx) {
        // Rita plattformen
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        
        // Rita en enkel kant/skugga för att ge djup
        ctx.strokeStyle = 'darkgreen'
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }

    update(deltaTime) {
        if (this.axis === "x") {
            if (this.x < this.endValue && this.direction === "right") {
                this.x += this.velocity
                this.direction = "right"
            }

            else {
                this.x -= this.velocity
                this.direction = "left"
            }

            if (this.x < this.startValueX) {
                this.x += this.velocity
                this.direction = "right"
            }
        }

        else if (this.axis === "y") {
            if (this.y < this.endValue && this.direction === "up") {
                this.y += this.velocity
                this.direction = "up"
            }

            else {
                this.y -= this.velocity
                this.direction = "down"
            }

            if (this.y < this.startValueY) {
                this.y += this.velocity
                this.direction = "up"
            }
        }
    }
}