import * as PIXI from 'pixi.js'

export default class Player {
    constructor({ app }) {
        this.app = app
        let playerWidth = 64
        this.player = new PIXI.Sprite(PIXI.Texture.WHITE)
        this.player.anchor.set(0.5)
        this.player.position.set(app.screen.width / 2, app.screen.height / 2)
        this.player.width = this.player.height = playerWidth
        this.player.tint = 0xea985d
        app.stage.addChild(this.player)
    }

    get width(){
        return this.player.width
    }

    get position(){
        return this.player.position
    }

    update() {
        const cursorPosition = this.app.renderer.plugins.interaction.mouse.global
        const angle =
            Math.atan2(cursorPosition.y - this.player.position.y, cursorPosition.x - this.player.position.x) +
            Math.PI / 2
        this.player.rotation = angle
    }
}
