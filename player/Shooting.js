import * as PIXI from 'pixi.js'

import Victor from 'victor'
import { sound } from '@pixi/sound'

export default class Shooting {
    constructor({ app, player }) {
        this.app = app
        this.player = player
        this.bulletSpeed = 7
        this.bullets = []
        this.bulletRadius = 3
        this.maxBullets = 5
    }

    fire() {
        if (this.bullets.length >= this.maxBullets) {
            let b = this.bullets.shift()
            this.app.stage.removeChild(b)
        }

        this.bullets.forEach(b => this.app.stage.removeChild(b))

        //removing bullets outside the play ground
        this.bullets = this.bullets.filter(
            b => Math.abs(b.position.x) < this.app.screen.width && Math.abs(b.position.y) < this.app.screen.height
        )

        this.bullets.forEach(b => this.app.stage.addChild(b))

        const bullet = new PIXI.Graphics()
        bullet.position.set(this.player.position.x, this.player.position.y)
        bullet.beginFill(0xffffff, 1)
        bullet.drawCircle(0, 0, this.bulletRadius)
        bullet.endFill()
        let angle = this.player.player.rotation - Math.PI / 2
        bullet.velocity = new Victor(Math.cos(angle), Math.sin(angle)).multiplyScalar(this.bulletSpeed)
        this.bullets.push(bullet)
        sound.add('my-sound', '../sounds/boing.mp3')
        sound.play('my-sound')
        this.app.stage.addChild(bullet)
    }

    set shoot(shooting) {
        if (shooting) {
            this.fire()
            this.interval = setInterval(() => this.fire(), 500)
        } else {
            clearInterval(this.interval)
        }
    }

    killBullet(bullet) {
        this.app.stage.removeChild(bullet)
    }

    update(delta) {
        this.bullets.forEach(b => {
            b.position.set(b.position.x + b.velocity.x * delta, b.position.y + b.velocity.y * delta)
        })
    }
}
