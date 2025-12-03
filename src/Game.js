import Rectangle from './Rectangle.js'
import InputHandler from './InputHandler.js'
import Circle from "./Circle.js"
import Triangle from './Triangle.js'

export default class Game {
    constructor(width, height) {
        this.width = width
        this.height = height
        
        this.inputHandler = new InputHandler(this)
        
        // Skapa alla objekt i spelet
        this.gameObjects = [
            new Rectangle(this, 50, 50, 100, 100, 'red'),
            new Rectangle(this, 200, 150, 150, 75, 'blue'),
            new Rectangle(this, 100, 300, 40, 200, "brown"),
            new Rectangle(this, 25, 100, 200, 200, "green"), 
            new Rectangle(this, 100, 120, 25, 25, "red"),
            new Rectangle(this, 50, 130, 25, 25, "red"),
            new Rectangle(this, 150, 175, 25, 25, "red"),
            new Circle(this, 800, 50, 40, "yellow"),
            new Circle(this, 500, 230, 40, "white"),
            new Circle(this, 500, 315, 55, "white"),
            new Circle(this, 500, 425, 70, "white"),
            new Triangle(this, 600, 225, 400, 250, 100, 30, "orange")
        ]

        this.elapsedTime = 0
    }

    update(deltaTime) {
        // Uppdatera spelet utifrån deltaTime
        this.gameObjects.forEach(obj => obj.update(deltaTime))

        // Exempel på input-hantering, detta bör hanteras av rektanglarna själva
        if (this.inputHandler.keys.has('r')) {
            this.gameObjects[0].velocityX += 0.001 * deltaTime
        }
        if (this.inputHandler.keys.has('b')) {
            this.gameObjects[1].velocityY -= 0.001 * deltaTime
        }

        this.elapsedTime += deltaTime
    }

    draw(ctx) {
        // Rita alla spelobjekt
        this.gameObjects.forEach(obj => obj.draw(ctx))

        ctx.fillStyle = "white"
        ctx.font = "20px Arial"
        ctx.fillText(`Time wasted: ${(this.elapsedTime / 1000).toFixed(2)} s`, 10, 30)
    }
}