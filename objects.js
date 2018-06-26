class GameObject {
  constructor(point, path) {
    this.point = point;
    this.path = path;
    this.img = new Image();
    this.img.src = this.path;
  }
}

const AWAIT = 0
const WALK = 1
const DEAD = 2
const D_UP = 0
const D_DOWN = 1
const D_RIGHT = 2
const D_LEFT = 3

class Player extends GameObject {
  constructor(point, path) {
    super(point, path)
    this.state = AWAIT
    this.speed = 4
    this.move = 0
    this.direct = 0
    this.curPoint = {
      x: Math.floor((this.point.x) / BOX),
      y: Math.floor((this.point.y) / BOX)
    }
  }


  update() {
    //キー受付
    if (this.state == AWAIT) {
      if (keys._up == true) {
        if (Math.floor((this.point.y) / BOX) != 0) {
          this.state = WALK
          this.move = BOX
          this.direct = D_UP
        }
      } else if (keys._down == true) {
        if (Math.floor((this.point.y) / BOX) != 7) {
          this.state = WALK
          this.move = BOX
          this.direct = D_DOWN
        }
      } else if (keys._right == true) {
        if (Math.floor((this.point.x) / BOX) != 7) {
          this.state = WALK
          this.move = BOX
          this.direct = D_RIGHT
        }
      } else if (keys._left == true) {
        if (Math.floor((this.point.x) / BOX) != 0) {
          this.state = WALK
          this.move = BOX
          this.direct = D_LEFT
        }
      }
    }
    //移動のみ
    if (this.state == WALK) {
      if (this.move != 0) {
        let delta
        if (this.move <= this.speed) {
          delta = this.move
          this.move = 0
        } else {
          this.move -= this.speed
          delta = this.speed
        }
        // this.move -= this.speed
        // delta = this.speed
        if (this.direct == D_UP) {
          this.point.y -= delta
        }
        if (this.direct == D_DOWN) {
          this.point.y += delta
        }
        if (this.direct == D_RIGHT) {
          this.point.x += delta
        }
        if (this.direct == D_LEFT) {
          this.point.x -= delta
        }
      } else {
        this.state = AWAIT
      }
    }

    this.curPoint = {
      x: Math.floor((this.point.x) / BOX),
      y: Math.floor((this.point.y) / BOX)
    }
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = color["GRAY"]
    ctx.arc(this.point.x, this.point.y, 25, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fill()
  }

  collision() {
    let posx = player.curPoint.x
    let posy = player.curPoint.y
    switch (blocks[posx][posy].type) {
      case RED:
      case BLUE:
      case GREEN:
        if (blocks[posx][posy].type == targetType) {
          sePlay(blocks[posx][posy].type)
          targetType = (targetType + 1) % 3
          blocks[posx][posy].type = SPACE
          score += 100
        } else {
          if(gameover==false){
            sePlay()
          }
          gameover = true
          isgenerated =false
          this.state = DEAD
        }
        break;
      case RED_BOMB:
      case BLUE_BOMB:
      case GREEN_BOMB:
        sePlay(blocks[posx][posy].type)
        gameover = true
        isgenerated = false
        this.state = DEAD
        break;
      case VANISH:
        sePlay(blocks[posx][posy].type)
        vanishCircle.init({x:posx,y:posy})
        blocks[posx][posy].type = SPACE
      case SPACE:
      default:
        break;
    }
  }
}

class Block extends GameObject {
  constructor(point, path, type) {
    super(point, path);
    this.type = type; //"red","blue","green"
  }

  draw() {

    switch(this.type){
      case RED:
        ctx.drawImage(tiles["RED"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case BLUE:
        ctx.drawImage(tiles["BLUE"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case GREEN:
        ctx.drawImage(tiles["GREEN"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case VANISH:
        ctx.drawImage(tiles["VANISH"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case RED_BOMB:
        ctx.drawImage(tiles["RED_BOMB"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case BLUE_BOMB:
        ctx.drawImage(tiles["BLUE_BOMB"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
      case GREEN_BOMB:
        ctx.drawImage(tiles["GREEN_BOMB"],this.point.x*BOX, this.point.y*BOX, BOX, BOX)
        break
    }
  }
}

class VanishCircle extends GameObject {
  constructor(point){
    super(point,"")
    this.exec = false
    this.radius = 0
    this.exectime = 0
  }

  init(point){
    isgenerated = false
    this.point = point
    this.exectime = 0
    this.exec = true
    this.radius = 0
  }

  update(){
    if(this.exec){
      this.exectime+=1
      if(this.exectime>60){
        this.exectime = 0
        this.exec = false
        this.radius = 0
        isgenerated = true
      }
    }
  }

  draw() {
    if(this.exec){
      console.log()
      ctx.save()
      ctx.beginPath()
      ctx.rect(0,0,480,480)
      ctx.closePath()
      ctx.clip()
      ctx.beginPath()
      ctx.strokeStyle = color["BLACK"]
      ctx.lineWidth = this.radius
      //ctx.arc(240,240,this.radius,0,Math.PI*2)
      ctx.arc(this.point.x*BOX+BOX/2,this.point.y*BOX+BOX/2,this.radius,0,Math.PI*2)
      ctx.stroke()
      ctx.restore()
      this.radius=(this.radius+1)*1.1
    }
  }

  collision() {
    for(let i=0;i<BOX_NUM;i++){
      for(let j=0;j<BOX_NUM;j++){
        let d = distance(this.point,{x:i,y:j})
        if(d < this.radius/BOX){
          blocks[i][j].type = SPACE
        }
      }
    }
  }
}

class Title {
  constructor(){
    this.img = new Image()
    this.img.src = "asset/image/title.png"
  }
}

class Result {
  constructor(){
    this.img = new Image()
    this.img.src = "asset/image/result.png"
  }
}

let tiles = {
  "RED":new Image(),
  "GREEN":new Image(),
  "BLUE":new Image(),
  "VANISH":new Image(),
  "RED_BOMB":new Image(),
  "GREEN_BOMB":new Image(),
  "BLUE_BOMB":new Image(),
}
tiles["RED"].src = "asset/image/RedTile.png"
tiles["GREEN"].src = "asset/image/GreenTile.png"
tiles["BLUE"].src = "asset/image/BlueTile.png"
tiles["VANISH"].src = "asset/image/VanishTile.png"
tiles["RED_BOMB"].src = "asset/image/RedBombTile.png"
tiles["GREEN_BOMB"].src = "asset/image/GreenBombTile.png"
tiles["BLUE_BOMB"].src = "asset/image/BlueBombTile.png"

let se_piano = {
  "C": new Audio("asset/se/2C.mp3"),
  "D": new Audio("asset/se/2D.mp3"),
  "E": new Audio("asset/se/2E.mp3"),
  "F": new Audio("asset/se/2F.mp3"),
  "G": new Audio("asset/se/2G.mp3"),
  "A": new Audio("asset/se/2A.mp3"),
  "B": new Audio("asset/se/2B.mp3"),
  "upperC": new Audio("asset/se/1C.mp3"),
  "VANISH": new Audio("asset/se/jump02.mp3"),
  "MISTAKE": new Audio("asset/se/blip01.mp3"),
}

let color = {
  "RED": "rgb(220,0,0)",
  "BLUE": "rgb(0,0,220)",
  "GREEN": "rgb(0,220,0)",
  "BLACK": "rgb(0,0,0)",
  "WHITE": "rgb(255,255,255)",
  "GRAY" : "rgb(100,100,100)",
}
