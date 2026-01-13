import GameObject from './GameObject.js'

export default class Platform extends GameObject {
    constructor(game, x, y, width, height, color = '#8B4513', sprite = null, spriteX = null, spriteY = null, spriteWidth = null, spriteHeight = null) {
        super(game, x, y, width, height)
        this.color = color
        this.sprite = sprite
        this.spriteX = spriteX
        this.spriteY = spriteY
        this.spriteWidth = spriteWidth
        this.spriteHeight = spriteHeight

        this.img = new Image()
        this.img.src = sprite
    }

    update(deltaTime) {
        // Plattformar är statiska, gör inget
    }

    draw(ctx, camera = null) {
        // Beräkna screen position (om camera finns)
        const screenX = camera ? this.x - camera.x : this.x
        const screenY = camera ? this.y - camera.y : this.y

        const blocksX = this.width / 48
        
        if (this.sprite) {
            for (let i = 0; i <= this.width; i+=48) {
                ctx.drawImage(this.img, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, screenX, screenY, this.width, this.height)
            }
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
