import * as PIXI from 'pixi.js'

export default class Score {
    constructor({ app }) {
        this.app = app
        this.score = 0
        this.text = new PIXI.Text(`SCORE: ${this.score}`)
    }

    createScene() {
        const margin = { x: 60, y: 20 }
        const sceneContainer = new PIXI.Container()
        this.text.style = { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' }
        this.text.x = this.app.screen.width - this.text.width - margin.x
        this.text.y = margin.y
        sceneContainer.zIndex = 1
        sceneContainer.addChild(this.text)
        this.app.stage.addChild(sceneContainer)
        return sceneContainer
    }

    createLevelScene() {
        const margin = { x: 60, y: 20 }
        this.levelText = new PIXI.Text(`LEVEL: ${this.app.level}`)
        const sceneContainer = new PIXI.Container()
        this.levelText.style = { fontFamily: 'Arial', fontSize: 24, fill: 0xffffff, align: 'center' }
        this.levelText.x = this.levelText.width - margin.x
        this.levelText.y = margin.y
        sceneContainer.zIndex = 1
        sceneContainer.addChild(this.levelText)
        this.app.stage.addChild(sceneContainer)
        return sceneContainer
    }

    levelUp() {
        if (!this.app.leveledUp && this.score >= this.app.level * 100) {
            this.app.leveledUp = true
            setTimeout(() => {
                this.app.leveledUp = false
                this.app.levelSpawnerUp()
                this.levelingUp()
            }, 1500)
        }
    }

    scoreUp(increment = 5) {
        this.score += increment
        this.text.text = `SCORE: ${this.score}`
    }

    scoreDown(decrement = 1) {
        if (this.score <= 0) return
        this.score -= decrement
        this.text.text = `SCORE: ${this.score}`
    }

    levelingUp() {
        this.app.level++
        this.levelText.text = `LEVEL: ${this.app.level}`
    }
}
