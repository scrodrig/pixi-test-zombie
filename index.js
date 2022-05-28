import * as PIXI from 'pixi.js'

import Player from './player/Player'
import Spawner from './enemy/Spawner'
import Zombie from './enemy/Zombie'

let canvasSize = 900
const canvas = document.getElementById('mycanvas')
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f
})

let player = new Player({ app })
let zSpawner = new Spawner({ create: () => new Zombie({ app, player }) })
setInterval(() => zSpawner.spawn(), 1000)

app.ticker.add(delta => {
    player.update()
    zSpawner.spawns.forEach(zombie => zombie.update())
    bulletHitTest({
        bullets: player.shooting.bullets,
        zombies: zSpawner.spawns,
        bulletRadius: player.shooting.bulletRadius,
        zombieRadius: 32
    })
})

function bulletHitTest({ bullets, zombies, bulletRadius, zombieRadius }) {
    bullets.forEach(bullet => {
        zombies.forEach((zombie, index) => {
            let dx = zombie.position.x - bullet.position.x
            let dy = zombie.position.y - bullet.position.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < bulletRadius + zombieRadius) {
                zombies.splice(index, 1)
                zombie.kill()
            }
        })
    })
}
