import * as PIXI from 'pixi.js'

import EnemyUtils from './enemy/enemyUtils'
import Player from './player/Player'
import Victor from 'victor'

let canvasSize = 900
const canvas = document.getElementById('mycanvas')
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x5c812f
})

let player = new Player({ app })

app.ticker.add(delta => {
    player.update()
    // const cursorPosition = app.renderer.plugins.interaction.mouse.global
    // const angle = Math.atan2(cursorPosition.y - square.position.y, cursorPosition.x - square.position.x) + Math.PI / 2
    // square.rotation = angle
    // let e = new Victor(enemy.position.x, enemy.position.y)
    // let s = new Victor(square.position.x, square.position.y)
    // if (e.distance(s) < squareWidth / 2) {
    //     let r = EnemyUtils.randomSpawnPoint()
    //     enemy.position.set(r.x, r.y)
    // }
    // let d = s.subtract(e)
    // let v = d.normalize().multiplyScalar(enemySpeed)
    // enemy.position.set(enemy.position.x + v.x, enemy.position.y + v.y)
})
