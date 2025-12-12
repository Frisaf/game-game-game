import Platform from "./Platform"

export default class MovingPlatform extends Platform {
    constructor(game, x, y, width, height, endValue, axis, color = "#8B4513") {
        super(game, x, y, width, height, color)

        this.endValue = endValue
        this.axis = axis
        this.startValueX = this.x
        this.startValueY = this.y
        this.direction = "right"
    }

    draw(ctx) {
        if (this.axis === "x") {
            if (this.x < this.endValue && this.direction === "right") {
                this.x += 1
                this.direction = "right"
            }

            else {
                this.x -= 1
                this.direction = "left"
            }

            if (this.x < this.startValueX) {
                this.x += 1
                this.direction = "right"
            }
        }

        else if (this.axis === "y") {
            this.y += 1
        }

        // Rita plattformen
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        
        // Rita en enkel kant/skugga för att ge djup
        ctx.strokeStyle = '#654321'
        ctx.lineWidth = 2
        ctx.strokeRect(this.x, this.y, this.width, this.height)
    }
}