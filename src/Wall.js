import GameObject from "./GameObject"

export default class Wall extends GameObject {
    constructor(game, x, color = 'white') {
        super(game, x)

        this.color = color
    }

    draw(ctx) {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, 500, 20, 500)
    }
}