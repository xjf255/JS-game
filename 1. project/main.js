const $select = document.querySelector('select')
console.log($select.value)
let playerState = $select.value

$select.addEventListener('change', e =>{
    playerState = e.target.value
})

const $canvas = document.querySelector('canvas')
const ctx = $canvas.getContext('2d') //context
const CANVAS_WITDH = $canvas.width = 600
const CANVAS_HEIGTH = $canvas.height = 600

const playerImage = new Image()
playerImage.src = '/images/shadow_dog.png'
const spriteWidth = 575
const spriteHeigth = 523
let gameFrame = 0
const staggerFrames = 3
const SpriteAnimations = []
const animationStates = [
    {
        name: 'idle',
        frame: 7
    }, 
    {
        name: 'jump',
        frame: 7
    },
    {
        name: 'fall',
        frame: 7
    }, 
    {
        name: 'run',
        frame: 9
    },
    {
        name: 'dizzy',
        frame: 11
    }, 
    {
        name: 'sit',
        frame: 5
    },
    {
        name: 'roll',
        frame: 7
    }, 
    {
        name: 'bite',
        frame: 7
    },
    {
        name: 'ko',
        frame: 12
    }, 
    {
        name: 'getHit',
        frame: 4
    }
]
animationStates.forEach((status,index) =>{
    let frame = {
        loc: [],
    }
    for (let j = 0 ; j < status.frame; j++){
        let positionX = j * spriteWidth
        let positionY = index * spriteHeigth
        frame.loc.push({x: positionX, y: positionY})
    }
    SpriteAnimations[status.name] = frame
})

function animate() {
    ctx.clearRect(0, 0, CANVAS_WITDH, CANVAS_HEIGTH) //limpiar el lienzo
    let position = Math.floor(gameFrame / staggerFrames) % SpriteAnimations[playerState].loc.length
    let frameX = spriteWidth * position
    let frameY = SpriteAnimations[playerState].loc[position].y
    //frame position\ frame size \ image Position \ image size
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeigth, 0, 0, spriteWidth, spriteHeigth)
    gameFrame++
    requestAnimationFrame(animate)
}
animate()