const OBSTACLE_SPEED = 1

const createNewObstacle = maxHeight => {
  const holeHeight = Math.random() * maxHeight + 40
  const holePosition = Math.random() * (maxHeight - holeHeight)
  return {
    color: 'black',
    width: 30,
    holeHeight: holeHeight,
    holePosition: holePosition,
    x: 50,
  }
}

const drawObstacle = (obstacle, canvasContext, canvasHeight) => {
  canvasContext.fillStyle = obstacle.color
  canvasContext.fillRect(obstacle.x, 0, obstacle.width, canvasHeight)
  canvasContext.clearRect(obstacle.x, obstacle.holePosition, obstacle.width, obstacle.holeHeight)
}

export default { createNewObstacle, drawObstacle }
