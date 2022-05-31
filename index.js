import * as PIXI from 'pixi.js'

import Player from './player/Player'
import Score from './game/Score'
import Spawner from './enemy/Spawner'
import Zombie from './enemy/Zombie'
import { sound } from '@pixi/sound'

let canvasSize = 650
const canvas = document.getElementById('mycanvas')
const app = new PIXI.Application({
    view: canvas,
    width: canvasSize,
    height: canvasSize,
    backgroundColor: 0x348fa3
})

app.gameStarted = false
app.leveledUp = false
app.level = 1

app.levelSpawnerUp = () => {
    zSpawner.levelUp()
}

let player = new Player({ app })
let score = new Score({ app })
let zSpawner = new Spawner({
    app,
    create: () => new Zombie({ app, player, score, level: app.level }),
    level: app.level
})

let gameStartScene = createScene('CLICK TO START')
let gameOverScene = createScene('GAME OVER!!')
let levelUpScene = createScene('LEVEL UP!!', 0x32a84)
let scoreScene = score.createScene()
let levelScene = score.createLevelScene()

sound.add('music', './sounds/music.mp3')
if(!player.dead){
    sound.play('music', {
        loop: true,
        volume: 0.30
    })
}

app.ticker.add(delta => {
    gameOverScene.visible = player.dead
    gameStartScene.visible = !app.gameStarted
    scoreScene.visible = true
    levelScene.visible = true
    levelUpScene.visible = !player.dead && app.leveledUp
    if (app.gameStarted === false) return
    score.levelUp()
    player.update(delta)
    if (!player.dead) {
        zSpawner.spawns.forEach(zombie => zombie.update(delta))
    }
    //Stop attacking when player is dead
    if (player.dead) {
        sound.stop('music')
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
                score.scoreUp(zombie.scoringPoint)
            }
        })
    })
}

function createScene(sceneText, fill=0xffffff) {
    const sceneContainer = new PIXI.Container()
    const text = new PIXI.Text(sceneText)
    text.style = { fontFamily: 'papyrus', fontSize: 50, fill, align: 'center' }
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
