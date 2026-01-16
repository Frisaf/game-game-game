import FlyingEnemy from "./FlyingEnemy"

export default class Boss extends FlyingEnemy {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height)

        this.color = "yellow"
        this.hp = 100
    }

    takeDamage(amount) {
        this.health -= amount

        if (this.health <= 0) {
            this.markedForDeletion = true
        }
    }
}