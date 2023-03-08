import ObstacleModule from './obstacle.js'
import { random } from './utils.js'

const PLAYER_MOVEMENT_SPEED = 3
const PLAYER_JUMP_SPEED = 7
const PLAYER_GAVITY_SPEED = 0.1

let dinoUpSprite = new Image()
dinoUpSprite.src = 'src/DinoUP.png'

let dinoDownSprite = new Image()
dinoDownSprite.src = 'src/DinoDown.png'

const createNewPlayer = () => ({
  color: random(['red', 'blue', 'green', 'yellow']),
  height: 44,
  width: 44,
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  isMovingRight: false,
  isMovingLeft: false,
})

const drawPlayer = (player, canvasContext) => {
  canvasContext.fillStyle = player.color
  const sprite = player.ySpeed > 0 ? dinoUpSprite : dinoDownSprite

  canvasContext.drawImage(
    sprite,
    player.x - 20,
    player.y - 10,
    player.width + 20,
    player.height + 20,
  )
}

const playerJump = player => {
  player.ySpeed -= PLAYER_JUMP_SPEED
}

const updatePlayer = (player, maxHeight, maxWidth) => {
  player.y += player.ySpeed
  player.x += player.xSpeed

  if (player.isMovingLeft) {
    player.xSpeed = -PLAYER_MOVEMENT_SPEED
  } else if (player.xSpeed < 0) {
    player.xSpeed += 1
  }
  if (player.isMovingRight) {
    player.xSpeed = PLAYER_MOVEMENT_SPEED
  } else if (player.xSpeed > 0) {
    player.xSpeed -= 1
  }

  player.ySpeed += PLAYER_GAVITY_SPEED

  // check up and down map constraints
  if (player.height + player.y > maxHeight) {
    player.y = maxHeight - player.height
    player.isJumping = false
    player.ySpeed = 0
  } else if (player.y < 0) {
    player.y = 0
    player.ySpeed = 0
  }

  // check right and left map constraints
  if (player.width + player.x > maxWidth) {
    player.x = maxWidth - player.width
    player.xSpeed = 0
  } else if (player.x < 0) {
    player.x = 0
    player.xSpeed = 0
  }
}

const playerMovingLeft = (player, isMoving) => {
  player.isMovingLeft = isMoving
}

const playerMovingRight = (player, isMoving) => {
  player.isMovingRight = isMoving
}

const checkCollision = (player, obstacles) => {
  const playerTopLeft = { x: player.x, y: player.y }
  const playerTopRight = { x: player.x + player.width, y: player.y }
  const playerBottomLeft = { x: player.x, y: player.y + player.height }
  const playerBottomRight = { x: player.x + player.width, y: player.y + player.height }
  const collided = obstacles.some(
    obs =>
      ObstacleModule.isInsideObstacle(obs, playerTopLeft) ||
      ObstacleModule.isInsideObstacle(obs, playerTopRight) ||
      ObstacleModule.isInsideObstacle(obs, playerBottomLeft) ||
      ObstacleModule.isInsideObstacle(obs, playerBottomRight),
  )

  return collided
}

export default {
  createNewPlayer,
  updatePlayer,
  drawPlayer,
  playerMovingLeft,
  playerMovingRight,
  playerJump,
  checkCollision,
}
