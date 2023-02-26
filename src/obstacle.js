import { random } from './utils.js'

const OBSTACLE_SPEED = 1

const createNewObstacle = (maxHeight, maxWidth) => {
  const holeHeight = Math.random() * maxHeight + 100
  const holePosition = Math.random() * (maxHeight - holeHeight)
  return {
    color: random(['black', 'brown']),
    width: 30,
    holeHeight: holeHeight,
    holePosition: holePosition,
    x: maxWidth,
  }
}

const drawObstacle = (obstacle, canvasContext, canvasHeight) => {
  canvasContext.fillStyle = obstacle.color
  canvasContext.fillRect(obstacle.x, 0, obstacle.width, canvasHeight)
  canvasContext.clearRect(obstacle.x, obstacle.holePosition, obstacle.width, obstacle.holeHeight)
}

const updateObstacle = obstacle => {
  obstacle.x -= OBSTACLE_SPEED
}

export default { createNewObstacle, drawObstacle, updateObstacle }
