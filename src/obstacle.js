import { random } from './utils.js'

const OBSTACLE_HOLE_DECREASE_RATE = 15
const OBSTACLE_SPAWN_AREA_WIDTH = 340
const OBSTACLE_SPEED_INCREASE_RATE = 0.05
const MAX_OBSTACLE_WIDTH = 200
const MIN_OBSTACLE_WIDTH = 30

let obstacleHoleCurrentSize = 450
let obstacleSpeed = 1

const createNewObstacle = (maxHeight, maxWidth) => {
  const holeSize = obstacleHoleCurrentSize
  const holePosition = Math.random() * (maxHeight - holeSize)
  const width = Math.random() * (MAX_OBSTACLE_WIDTH - MIN_OBSTACLE_WIDTH) + MIN_OBSTACLE_WIDTH
  return {
    color: random(['black', 'brown']),
    width: width,
    holeSize: holeSize,
    holePosition: holePosition,
    x: maxWidth,
  }
}

const updateObstacle = obstacle => {
  obstacle.x -= obstacleSpeed
}
const increaseObstaclesSpeed = () => {
  obstacleSpeed += OBSTACLE_SPEED_INCREASE_RATE
}
const decraseSpawnHoleSize = () => {
  if (obstacleHoleCurrentSize > 100) obstacleHoleCurrentSize -= OBSTACLE_HOLE_DECREASE_RATE
}

const removeOutOfFieldObstacles = obstacles => obstacles.filter(obs => obs.x + obs.width > 0)

const isSpawnAreaClear = (obstacles, maxWidth) =>
  !obstacles.some(obs => obs.x + obs.width > maxWidth - OBSTACLE_SPAWN_AREA_WIDTH)

const updateObstacleList = (obstacles, maxHeight, maxWidth) => {
  let newObstaclesList = [...obstacles]
  newObstaclesList.forEach(obstacle => {
    updateObstacle(obstacle)
  })

  newObstaclesList = removeOutOfFieldObstacles(obstacles)

  if (isSpawnAreaClear(newObstaclesList, maxWidth)) {
    decraseSpawnHoleSize()
    increaseObstaclesSpeed()
    newObstaclesList.push(createNewObstacle(maxHeight, maxWidth))
  }
  return newObstaclesList
}

const drawObstacle = (obstacle, canvasContext, canvasHeight) => {
  canvasContext.fillStyle = obstacle.color
  canvasContext.fillRect(obstacle.x, 0, obstacle.width, canvasHeight)
  // here is added 4 and -2 to prevent flickering, from the moving object and the clearRect
  canvasContext.clearRect(
    obstacle.x - 2,
    obstacle.holePosition,
    obstacle.width + 4,
    obstacle.holeSize,
  )
}

const drawObstacles = (obstacles, canvasContext, maxHeight) => {
  obstacles.forEach(obstacle => {
    drawObstacle(obstacle, canvasContext, maxHeight)
  })
}

const isInsideObstacle = (obs, coord) => {
  const isInObstacleArea = coord.x > obs.x && coord.x < obs.x + obs.width
  if (isInObstacleArea) {
    const isInObstacleHole = coord.y > obs.holePosition && coord.y < obs.holePosition + obs.holeSize
    return !isInObstacleHole
  }
  return false
}

export default {
  updateObstacleList,
  drawObstacles,
  isInsideObstacle,
}
