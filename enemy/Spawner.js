export default class Spawner {
    constructor({ app, create, level }) {
        this.app = app
        this.spawnInterval = 1000
        this.maxSpawns = 10
        this.level = level
        this.create = create
        this.spawns = []
        setInterval(() => this.spawn(), this.spawnInterval)
    }

    levelUp() {
        this.maxSpawns += 2
        setInterval(() => this.spawn(), this.spawnInterval * this.level * 2)
    }

    spawn() {
        if (this.app.gameStarted === false) return
        if (this.spawns.length >= this.maxSpawns) return
        let s = this.create()
        this.spawns.push(s)
    }
}
