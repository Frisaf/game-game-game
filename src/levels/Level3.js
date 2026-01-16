import Level from './Level.js'
import Platform from '../Platform.js'
import Coin from '../Coin.js'
import Enemy from '../Enemy.js'
import Background from '../Background.js'
import BackgroundObject from '../BackgroundObject.js'
import greenBg from '../assets/Pixel Adventure 1/Background/Green.png'
import bigClouds from '../assets/clouds/Big Clouds.png'
import cloud1 from '../assets/clouds/Small Cloud 1.png'
import cloud2 from '../assets/clouds/Small Cloud 2.png'
import FlyingEnemy from '../FlyingEnemy.js'
import Boss from '../Boss.js'

export default class Level3 extends Level {
    constructor(game) {
        super(game)
        
        // Player spawn position för denna level
        this.playerSpawnX = 50
        this.playerSpawnY = 50
        
        // Initiera level
        this.init()
    }

    createBackgrounds() {
        this.backgrounds = [
            // Far background - rosa himmel (skymning känsla, svårare level)
            new Background(this.game, greenBg, {
                tiled: true,
                tileWidth: 64,
                tileHeight: 64,
                scrollSpeed: 0.3
            }),
            // Mid background - stora moln
            new Background(this.game, bigClouds, {
                tiled: true,
                tileWidth: 448,
                tileHeight: 101,
                tileY: false,
                scrollSpeed: 0.6,
                yPosition: this.game.height - 141,
                height: 101
            })
        ]
    }

    createBackgroundObjects() {
        const height = this.game.height

        this.backgroundObjects = [
            // Fler och snabbare moln för svårare level
            new BackgroundObject(this.game, 150, height - 320, cloud1, {
                speed: 0.025,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 500, height - 280, cloud2, {
                speed: 0.02,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 900, height - 300, cloud1, {
                speed: 0.028,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 1300, height - 260, cloud2, {
                speed: 0.022,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 1700, height - 340, cloud1, {
                speed: 0.026,
                scrollSpeed: 0.4
            }),
            new BackgroundObject(this.game, 2100, height - 290, cloud2, {
                speed: 0.024,
                scrollSpeed: 0.4
            })
        ]
    }

    createPlatforms() {
        const height = this.game.height
        const worldWidth = this.game.worldWidth

        this.platforms = [
            new Platform(this.game, 0, height - 40, worldWidth, 40, {sprite: {ground: true}}),

            new Platform(this.game, 300, height - 200, 256, 32, {sprite: {platform: true}}),
            new Platform(this.game, worldWidth - 100, 0, 32, height - 38, {sprite: {platform: true}})

        ]
    }

    createCoins() {
        const height = this.game.height

        this.coins = [
            new Coin(this.game, this.game.worldWidth - 50, height - 220)
        ]
    }

    createEnemies() {
        const height = this.game.height

        this.enemies = [
            new Boss(this.game, 300, height - 220, 100, 100)
        ]
    }
}