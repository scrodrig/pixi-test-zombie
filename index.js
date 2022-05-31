import * as PIXI from 'pixi.js'

import Player from './player/Player'
import Score from './game/Score'
import Spawner from './enemy/Spawner'
import Zombie from './enemy/Zombie'

let canvasSize = 900
const canvas = document.getElementById('mycanvas')
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x348fa3
})

let player = new Player({ app })
let score = new Score({ app })
let zSpawner = new Spawner({ app, create: () => new Zombie({ app, player, score }) })

let gameStartScene = createScene('<< Click to Start >>')
let gameOverScene = createScene('Game Over!!')
let scoreScene = score.createScene()
app.gameStarted = false

app.ticker.add(delta => {
    gameOverScene.visible = player.dead
    gameStartScene.visible = !app.gameStarted
    scoreScene.visible = true
    if (app.gameStarted === false) return
    player.update(delta)
    if (!player.dead) {
        zSpawner.spawns.forEach(zombie => zombie.update(delta))
    }
    //Stop attacking when player is dead
    if (player.dead) {
        zSpawner.spawns.forEach(zombie => zombie.stopAttacking())
    }
    bulletHitTest({
        bullets: player.shooting.bullets,
        zombies: zSpawner.spawns,
        bulletRadius: player.shooting.bulletRadius,
        zombieRadius: 40
    })
})

function bulletHitTest({ bullets, zombies, bulletRadius, zombieRadius }) {
    bullets.forEach((bullet, bIndex) => {
        zombies.forEach((zombie, zIndex) => {
            let dx = zombie.position.x - bullet.position.x
            let dy = zombie.position.y - bullet.position.y
            let distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < bulletRadius + zombieRadius) {
                zombies.splice(zIndex, 1)
                zombie.kill()
                //Kill bullet
                bullets.splice(bIndex, 1)
                player.shooting.killBullet(bullet)
                //scoring
                score.scoreUp()
            }
        })
    })
}

function createScene(sceneText) {
    const sceneContainer = new PIXI.Container()
    const text = new PIXI.Text(sceneText)
    text.style = { fontFamily: 'Arial', fontSize: 50, fill: 0xffffff, align: 'center' }
    text.x = app.screen.width / 2
    text.y = app.screen.height / 3
    text.anchor.set(0.5, 0)
    sceneContainer.zIndex = 1
    sceneContainer.addChild(text)
    app.stage.addChild(sceneContainer)
    return sceneContainer
}

function startGame() {
    app.gameStarted = true
}

document.addEventListener('click', startGame)
