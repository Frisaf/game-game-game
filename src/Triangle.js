import GameObject from "./GameObject"

export default class Triangle extends GameObject {
    constructor(game, x1, y1, x2, y2, x3, y3, color = "orange") {
        super(game)
        this.color = color
        this.x1 = x1
        this.x2 = x2
        this.x3 = x3
        this.y1 = y1
        this.y2 = y2
        this.y3 = y3
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(this.x1, this.y1)
        ctx.lineTo(this.x2, this.y2)
        ctx.lineTo(this.x3, this.x3)
        ctx.fill()
    }
}