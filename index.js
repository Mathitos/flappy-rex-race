import PlayerModule from './src/player.js'

console.log('initing game ...')
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

const obstacles = []

const obstacleSpeed = 1

const player1 = PlayerModule.createNewPlayer()

const generateObstacle = () => {
  const newObstacle = {
    color: 'blue',
    height: 200,
    width: 30,
    x: 0,
    y: 0,
  }

  obstacles.push(newObstacle)
}

const clearCanvas = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

const handleKeyboardEvents = event => {
  if (event.key == 'a') {
    PlayerModule.playerMovingLeft(player1, event.type == 'keydown')
  }
  if (event.key == 'd') {
    PlayerModule.playerMovingRight(player1, event.type == 'keydown')
  }
  if (event.key == ' ' && event.type == 'keydown') {
    PlayerModule.playerJump(player1)
  }
}

const animateLoop = () => {
  clearCanvas()
  PlayerModule.updatePlayer(player1, canvas.height, canvas.width)
  PlayerModule.drawPlayer(player1, canvasContext)
  window.requestAnimationFrame(animateLoop)
}

window.addEventListener('keydown', handleKeyboardEvents)
window.addEventListener('keyup', handleKeyboardEvents)

animateLoop()
