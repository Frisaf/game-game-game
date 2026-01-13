import GameObject from './GameObject.js'
import Sprite from './Sprite.js'

export default class Platform extends GameObject {
    constructor(game, x, y, width, height, options = {}) {
        super(game, x, y, width, height)
        
        this.color = options.color || '#8B4513'

        if (options.sprite) {
            this.sprite = new Sprite(options.sprite)
        }
    }

    update(deltaTime) {
        // Plattformar är statiska, gör inget
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y
        
        if (this.sprite && this.sprite.draw(ctx, screenX, screenY, this.width, this.height)) {
            return
        }

        else {
            // Rita plattformen
            ctx.fillStyle = this.color
            ctx.fillRect(screenX, screenY, this.width, this.height)
            
            // Rita en enkel kant/skugga för att ge djup
            ctx.strokeStyle = '#654321'
            ctx.lineWidth = 2
            ctx.strokeRect(screenX, screenY, this.width, this.height)
        }
    }
}
