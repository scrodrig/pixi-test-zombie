import * as PIXI from 'pixi.js'

import Victor from 'victor'
import { sound } from '@pixi/sound'

export default class Zombie {
    constructor({ app, player, score }) {
        this.app = app
        this.player = player
        this.score = score
        this.speed = 2 + 0.3 * this.app.level
        this.scoringPoint = 4 + this.app.level
        this.decrementPoint = 1 + Math.floor(0.5 * this.app.level)
        let r = this.randomSpawnPoint()
        this.zombie = new PIXI.Sprite.from(this.texture)
        this.zombie.position.set(r.x, r.y)
        this.zombie.anchor.set(0.5)
        this.zombie.height = 40
        this.zombie.width = 40
        this.attackInterval = 500 - 0.2 * this.app.level
        app.stage.addChild(this.zombie)
    }

    attackPlayer() {
        if (this.attacking) return
        this.attacking = true
        this.interval = setInterval(() => {
            this.player.attack()
            this.score.scoreDown(this.decrementPoint)
            sound.add('hit', '../sounds/hit.mp3')
            sound.play('hit')
            sound.volume('hit', 0.15)
        }, this.attackInterval)
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
        sound.add('scream', '../sounds/ouch.mp3')
        sound.play('scream')
        sound.volume('scream', 0.25)
        this.app.stage.removeChild(this.zombie)
        this.stopAttacking()
    }

    levelUp() {
        console.log(this.speed, this.scoringPoint)
        this.speed += this.speed * 0.1
        this.scoringPoint += 1
        this.attackInterval -= 20
        this.decrementPoint += Math.floor(0.5 * this.app.level)
    }

    stopAttacking() {
        clearInterval(this.interval)
    }

    loadTexture(spawnPointX) {
        const pick = Math.floor(Math.random() * 3) //Integer Random [0,2]
        const natiolnalities = ['us', 'ec', 'sgr']
        const nationality = natiolnalities[pick]
        if (spawnPointX <= this.app.screen.width / 2) {
            this.texture = PIXI.Texture.from(`../sprites/bad-shrimp-${nationality}.png`)
        } else {
            this.texture = PIXI.Texture.from(`../sprites/bad-shrimp-${nationality}-mirror.png`)
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
