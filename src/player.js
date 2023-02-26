const createNewPlayer = () => ({
  color: ['red', 'blue', 'green', 'yellow'].random(),
  height: 30,
  width: 30,
  x: 0,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  gravitySpeed: 0.2,
  upSpeed: 10,
  movementSpeed: 5,
  movingRight: false,
  movingLeft: false,
  isJumping: false,
})

const drawPlayer = (player, canvasContext) => {
  canvasContext.fillStyle = player.color
  canvasContext.fillRect(player.x, player.y, player.width, player.height)
}

const playerJump = player => {
  player.ySpeed -= player.upSpeed
}

const updatePlayer = (player, maxHeight, maxWidth) => {
  player.y += player.ySpeed
  player.x += player.xSpeed

  if (player.movingLeft) {
    player.xSpeed = -player.movementSpeed
  } else if (player.xSpeed < 0) {
    player.xSpeed += 1
  }
  if (player.movingRight) {
    player.xSpeed = player.movementSpeed
  } else if (player.xSpeed > 0) {
    player.xSpeed -= 1
  }

  player.ySpeed += player.gravitySpeed

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
  player.movingLeft = isMoving
}

const playerMovingRight = (player, isMoving) => {
  player.movingRight = isMoving
}

export default {
  updatePlayer,
  playerJump,
  drawPlayer,
  createNewPlayer,
  playerMovingLeft,
  playerMovingRight,
}
