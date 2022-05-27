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
app.ticker.add(delta => {
    player.update()
    console.log('L', zSpawner.spawns)
    zSpawner.spawns.forEach(zombie => zombie.update())
})
