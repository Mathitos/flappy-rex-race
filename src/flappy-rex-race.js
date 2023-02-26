import PlayerModule from './player.js'
import ObstacleModule from './obstacle.js'

console.log('initing game ...')

/*
    ----------------------------------------------------
    ------------- Setup Game state objects -------------
    ----------------------------------------------------
*/

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 1024 // 64 * 16
canvas.height = 576 // 64 * 9

const player1 = PlayerModule.createNewPlayer()
const obstacles = []

obstacles.push(ObstacleModule.createNewObstacle(canvas.height, canvas.width))

/*
    ----------------------------------------------------
    -------- Listen for players keyboard inputs --------
    ----------------------------------------------------
*/

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

window.addEventListener('keydown', handleKeyboardEvents)
window.addEventListener('keyup', handleKeyboardEvents)

/*
    ----------------------------------------------------
    -------------- Setup Game render loop --------------
    ----------------------------------------------------
*/

const clearCanvas = () => {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height)
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

animateLoop()

console.log('starting game, good luck!')
