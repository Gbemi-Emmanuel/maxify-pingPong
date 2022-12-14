// update Loop
import ball from './ball.js'
import paddle from './paddle.js'


const Ball = new ball(document.getElementById('ball'));
const playerPaddle = new paddle(document.getElementById('player-paddle'))
const computerPaddle = new paddle(document.getElementById('computer-paddle'))
const playerScoreElem = document.getElementById("computer-score")
const computerScoreElem = document.getElementById("player-score")


let lastTime
function update(time) {
    
    if (lastTime != null) {
        const delta = time - lastTime;
        //update code
        Ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, Ball.y)
       const hue = parseFloat( getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue + delta * .01) 
        if (isLose()) handleLose()
    }

    
    lastTime = time
    window.requestAnimationFrame(update)
}

function isLose() {
    const rect = Ball.rect()
    return rect.right >= window.innerHeight || rect.left <= 0 
}

function handleLose() {
    const rect = Ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    }
    else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }
    Ball.reset()
    computerPaddle.reset()
}

document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})

window.requestAnimationFrame(update)