import Enemy from "./Enemy"

export default class FollowingEnemy extends Enemy {
    constructor(game, x, y, width, height, patrolDistance = null, speed, damage) {
        super(game, x, y, width, height, patrolDistance, speed, damage)
    }

    update(deltaTime) {
        if (this.game.player < this.x) {
            this.x -= this.speed * deltaTime
        }

        else {
            this.x += this.speed * deltaTime
        }
    }
}