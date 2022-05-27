export default class Spawner {
    contructor({ create }) {
        const spawnInterval = 1000
        this.maxSpawns = 3
        this.create = create
        this.spawns = []
        setInterval(() => this.spawn(), spawnInterval)
    }

    spawn() {
        console.log('s', this.spawns)
        if (this.spawns.length >= this.maxSpawns) return
        let s = this.create()
        this.spawns.push(s)
    }
}
