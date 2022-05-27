import * as PIXI from 'pixi.js'

import Player from './player/Player'
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
let zombie = new Zombie({ app, player })
app.ticker.add(delta => {
    player.update()
    zombie.update()
})
