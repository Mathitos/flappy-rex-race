import PlayerModule from './src/player.js'
import ObstacleModule from './src/obstacle.js'

console.log('initing game ...')
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)]
}

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

const obstacles = []

const player1 = PlayerModule.createNewPlayer()

const clearCanvas = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
}

const handleKeyboardEvents = event => {
  if (event.key == 'a' || event.key == 'A') {
    PlayerModule.playerMovingLeft(player1, event.type == 'keydown')
  }
  if (event.key == 'd' || event.key == 'D') {
    PlayerModule.playerMovingRight(player1, event.type == 'keydown')
  }
  if (event.key == ' ' && event.type == 'keydown') {
    PlayerModule.playerJump(player1)
  }
}

const animateLoop = () => {
  clearCanvas()
  PlayerModule.updatePlayer(player1, canvas.height, canvas.width)
  obstacles.forEach(obstacle => {
    ObstacleModule.updateObstacle(obstacle)
    ObstacleModule.drawObstacle(obstacle, canvasContext, canvas.height)
  })
  PlayerModule.drawPlayer(player1, canvasContext)
  window.requestAnimationFrame(animateLoop)
}

window.addEventListener('keydown', handleKeyboardEvents)
window.addEventListener('keyup', handleKeyboardEvents)

obstacles.push(ObstacleModule.createNewObstacle(canvas.height, canvas.width))

animateLoop()
