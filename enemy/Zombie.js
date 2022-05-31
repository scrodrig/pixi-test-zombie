import * as PIXI from 'pixi.js'

import Victor from 'victor'

export default class Zombie {
    constructor({ app, player, score }) {
        this.app = app
        this.player = player
        this.score = score
        this.speed = 2
        let r = this.randomSpawnPoint()
        this.zombie = new PIXI.Sprite.from(this.texture)
        this.zombie.position.set(r.x, r.y)
        this.zombie.height = 50
        this.zombie.width = 50
        app.stage.addChild(this.zombie)
    }

    attackPlayer() {
        if (this.attacking) return
        this.attacking = true
        this.interval = setInterval(() => {
            this.player.attack()
            this.score.scoreDown()
        }, 500)
    }

    update(delta) {
        let e = new Victor(this.zombie.position.x, this.zombie.position.y)
        let s = new Victor(this.player.position.x, this.player.position.y)
        if (e.distance(s) < this.player.width / 2) {
            this.attackPlayer()
            return
        }
        let d = s.subtract(e)
        let v = d.normalize().multiplyScalar(this.speed * delta)
        this.zombie.position.set(this.zombie.position.x + v.x, this.zombie.position.y + v.y)
    }

    get position() {
        return this.zombie.position
    }

    kill() {
        this.app.stage.removeChild(this.zombie)
        this.stopAttacking()
    }

    stopAttacking() {
        clearInterval(this.interval)
    }

    loadTexture(spawnPointX) {
        if (spawnPointX <= this.app.screen.width / 2) {
            this.texture = PIXI.Texture.from('../sprites/bad-shrimp.png')
        } else {
            this.texture = PIXI.Texture.from('../sprites/bad-shrimp-mirror.png')
        }
    }

    randomSpawnPoint = () => {
        this.edge = Math.floor(Math.random() * 4) //Integer Random [0,3]
        let canvasSize = this.app.screen.width
        let spawnPoint = new Victor(0, 0)
        switch (this.edge) {
            case 0: //top
                spawnPoint.x = canvasSize * Math.random()
                break
            case 1: //right
                spawnPoint.x = canvasSize
                spawnPoint.y = canvasSize * Math.random()
                break
            case 2: //bottom
                spawnPoint.x = canvasSize * Math.random()
                spawnPoint.y = canvasSize
                break
            default: //left
                spawnPoint.x = 0
                spawnPoint.y = canvasSize * Math.random()
                break
        }
        this.loadTexture(spawnPoint.x)
        return spawnPoint
    }
}
