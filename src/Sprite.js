import terrain from "./assets/Pixel Adventure 1/Terrain/Terrain (16x16).png"

/**
 * Sprite - För att rita ut statiska bilder och tilade terrängbitar
 * 
 * Använd denna klass för:
 * - Statiska sprites (plattformar, dekorationer, bakgrunder)
 * - Tilade texturer (upprepande mönster för mark, väggar)
 * 
 * För animerade sprites (karaktärer, fiender), använd istället GameObjects animationssystem.
 */
export default class Sprite {
    /**
     * @param {Object} config - Sprite configuration
     * @param {string} config.image - Path to the image file (imported in level)
     * @param {number} config.sourceWidth - Width of a single sprite/tile in the source image
     * @param {number} config.sourceHeight - Height of a single sprite/tile in the source image
     * @param {number} [config.sourceX=0] - X position in source image (for sprite sheets)
     * @param {number} [config.sourceY=0] - Y position in source image (for sprite sheets)
     * @param {string} [config.tile='none'] - Tiling mode: 'none', 'horizontal', 'vertical', or 'both'
     * @param {number} [config.tileIndex] - Which tile to use from sprite sheet (alternative to sourceX/Y)
     * @param {number} [config.tilesPerRow] - How many tiles per row (for tileIndex calculation)
     * @param {boolean} [config.ground]
     */
    constructor(config) {
        const groundConfig = {
            image: terrain,
            sourceWidth: 48,
            sourceHeight: 48,
            tile: "both",
            sourceX: 96,
        }
        const platformConfig = {
            image: terrain,
            sourceWidth: 32,
            sourceHeight: 32,
            tile: "both",
            sourceX: 208,
            sourceY: 16
        }

        this.image = new Image()
        
        if (config.platform) {
            this.image.src = platformConfig.image
            this.sourceWidth = platformConfig.sourceWidth
            this.sourceHeight = platformConfig.sourceHeight
            this.tile = platformConfig.tile
            this.sourceX = platformConfig.sourceX
            this.sourceY = platformConfig.sourceY
        } else if (config.ground) {
            this.image.src = groundConfig.image
            this.sourceWidth = groundConfig.sourceWidth
            this.sourceHeight = groundConfig.sourceHeight
            this.tile = groundConfig.tile
            this.sourceX = groundConfig.sourceX
            this.sourceY = 0
        } else {
            this.image.src = config.image
            // Source dimensions (size in sprite sheet)
            this.sourceWidth = config.sourceWidth
            this.sourceHeight = config.sourceHeight
            
            // Source position in sprite sheet
            this.sourceX = config.sourceX || 0
            this.sourceY = config.sourceY || 0
            
            // Tiling mode
            this.tile = config.tile || 'none' // 'none', 'horizontal', 'vertical', 'both'
        }

        this.loaded = false
        
        // Optional tileIndex calculation
        if (config.tileIndex !== undefined) {
            const tilesPerRow = config.tilesPerRow || Math.floor(this.image.width / this.sourceWidth)
            const row = Math.floor(config.tileIndex / tilesPerRow)
            const col = config.tileIndex % tilesPerRow
            this.sourceX = col * this.sourceWidth
            this.sourceY = row * this.sourceHeight
        }
        
        // Load handlers
        this.image.onload = () => {
            this.loaded = true
        }
        
        this.image.onerror = () => {
            console.error(`Failed to load sprite: ${config.image}`)
        }
    }
    
    /**
     * Draw the sprite at the specified position and size
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} x - X position to draw at (screen coordinates)
     * @param {number} y - Y position to draw at (screen coordinates)
     * @param {number} width - Width to draw (can be different from sprite width for scaling)
     * @param {number} height - Height to draw (can be different from sprite height for scaling)
     * @returns {boolean} - True if sprite was drawn, false if still loading
     */
    draw(ctx, x, y, width, height) {
        if (!this.loaded) return false
        
        switch (this.tile) {
            case 'none':
                this.drawSingle(ctx, x, y, width, height)
                break
            case 'horizontal':
                this.drawTiledHorizontal(ctx, x, y, width, height)
                break
            case 'vertical':
                this.drawTiledVertical(ctx, x, y, width, height)
                break
            case 'both':
                this.drawTiledBoth(ctx, x, y, width, height)
                break
            default:
                this.drawSingle(ctx, x, y, width, height)
        }
        
        return true
    }
    
    /**
     * Draw a single sprite (stretched to fit width/height)
     */
    drawSingle(ctx, x, y, width, height) {
        ctx.drawImage(
            this.image,
            this.sourceX,
            this.sourceY,
            this.sourceWidth,
            this.sourceHeight,
            x,
            y,
            width,
            height
        )
    }
    
    /**
     * Draw sprite tiled horizontally (repeated along x-axis)
     */
    drawTiledHorizontal(ctx, x, y, width, height) {
        const tileWidth = this.sourceWidth
        const numTiles = Math.ceil(width / tileWidth)
        
        for (let i = 0; i < numTiles; i++) {
            const tileX = x + i * tileWidth
            const remainingWidth = Math.min(tileWidth, width - i * tileWidth)
            
            ctx.drawImage(
                this.image,
                this.sourceX,
                this.sourceY,
                remainingWidth, // Clip last tile if needed
                this.sourceHeight,
                tileX,
                y,
                remainingWidth,
                height
            )
        }
    }
    
    /**
     * Draw sprite tiled vertically (repeated along y-axis)
     */
    drawTiledVertical(ctx, x, y, width, height) {
        const tileHeight = this.sourceHeight
        const numTiles = Math.ceil(height / tileHeight)
        
        for (let i = 0; i < numTiles; i++) {
            const tileY = y + i * tileHeight
            const remainingHeight = Math.min(tileHeight, height - i * tileHeight)
            
            ctx.drawImage(
                this.image,
                this.sourceX,
                this.sourceY,
                this.sourceWidth,
                remainingHeight, // Clip last tile if needed
                x,
                tileY,
                width,
                remainingHeight
            )
        }
    }
    
    /**
     * Draw sprite tiled in both directions (2D grid)
     */
    drawTiledBoth(ctx, x, y, width, height) {
        const tileWidth = this.sourceWidth
        const tileHeight = this.sourceHeight
        const numTilesX = Math.ceil(width / tileWidth)
        const numTilesY = Math.ceil(height / tileHeight)
        
        for (let row = 0; row < numTilesY; row++) {
            for (let col = 0; col < numTilesX; col++) {
                const tileX = x + col * tileWidth
                const tileY = y + row * tileHeight
                const remainingWidth = Math.min(tileWidth, width - col * tileWidth)
                const remainingHeight = Math.min(tileHeight, height - row * tileHeight)
                
                ctx.drawImage(
                    this.image,
                    this.sourceX,
                    this.sourceY,
                    remainingWidth,
                    remainingHeight,
                    tileX,
                    tileY,
                    remainingWidth,
                    remainingHeight
                )
            }
        }
    }
}