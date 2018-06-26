// Const -------------------------------------------------
const WIDTH = 500 + 200
const HEIGHT = 500
const BOX = 60
const BOX_NUM = 8

const RED = 0
const GREEN = 1
const BLUE = 2
const VANISH = 3
const RED_BOMB = 4
const BLUE_BOMB = 5
const GREEN_BOMB = 6
const SPACE = -1

const GAME_TITLE = 0
const GAME_PLAY = 1
const GAME_RESULT = 2
// Global ------------------------------------------------
let screenCanvas
let ctx
let fps = 60
let frequency = 1000/fps
let run = true
let keys = new Key()
let gameMode = GAME_TITLE
let player
let blocks = []
let nextType = 0 // 次生成するタイプ
let targetType = 0 //次にぶつかるタイプ
let phase
let time = 0
let gameTime = 0
let gameover
let score
let interval //生成間隔（秒）
let isgenerated
let vanishCircle
let title = new Title()
let result = new Result()
let spaceState = false

// Main  -------------------------------------------------

window.onload = () => {

  //スクリーンの初期化
  screenCanvas = document.getElementById("screen");
  screenCanvas.width=WIDTH
  screenCanvas.height=HEIGHT

  //canvas2d
  ctx = screenCanvas.getContext("2d");
  ctx.translate(10,10)
  //startDisplay()
  initial()
  if(run){
      setInterval(main,frequency);
  }
}

const main = () => {
  switch(gameMode){
    case GAME_TITLE:
      drawTitle()
      updateTitle()
      break
    case GAME_PLAY:
      update()
      draw()
      gameTime += 1
      break;
    case GAME_RESULT:
      drawResult()
      updateResult()
      break;
  }
  time += 1

  if(keys._debug){
    debug()
  }
}

const initial = () => {
  player = new Player({x:90,y:30},"/")
  for (let i=0;i<BOX_NUM;i++){
    let temp = []
    for (let j=0;j<BOX_NUM;j++){
      temp[j]=new Block({x:i,y:j},"/",SPACE);
    }
    blocks[i] = temp
  }
  vanishCircle = new VanishCircle({x:0,y:0})
  gameover = false
  score = 0
  interval = 2
  isgenerated = true
  phase = 1
  gameTime = 0
  nextType = RED
  targetType = RED
}
