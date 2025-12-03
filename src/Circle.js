import GameObject from "./GameObject";

export default class Circle extends GameObject {
    constructor(game, x, y, radius, color = "orange") {
        super(game, x, y)
        this.radius = radius
        this.color = color
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
    }
}