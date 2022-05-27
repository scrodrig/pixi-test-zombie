import Victor from 'victor'

let canvasSize = 1024

class EnemyUtils {
    static randomSpawnPoint = () => {
        const edge = Math.floor(Math.random() * 4) //Integer Random [0,3]
        let spawnPoint = new Victor(0, 0)
        switch (edge) {
            case 0: //top
                spawnPoint.x = canvasSize * Math.random()
                break
            case 1: //right
                spawnPoint.x = canvasSize
                spawnPoint.y = canvasSize * Math.random()
                break
            case 2: //bottom
                spawnPoint.x = canvasSize * Math.random()
                spawnPoint.y = canvasSize
                break
            default: //left
                spawnPoint.x = 0
                spawnPoint.y = canvasSize * Math.random()
                break
        }
        return spawnPoint
    }
}
export default EnemyUtils
