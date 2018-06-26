const update = () => {
  if(isgenerated){
    generate()
    randomGenerate()
  }
  player.update()
  vanishCircle.update()
  collision()
  phaseControl()
  updateGameover()
}

const generate = () => {
  if (gameTime % (fps*interval) == 0){
    let random1 = Math.floor(Math.random()*8)
    let random2 = Math.floor(Math.random()*8)
    let determin = false
    let attempt = 0
    while(1){
      if(attempt<10){
        if(hardGenerateJudge(random1,random2)){
          break;
        }
      }else if(10<=attempt && attempt <= 20){
        if(easyGenerateJudge(random1,random2)){
          break;
        }
      }else{
        break;
      }
      random1 = Math.floor(Math.random()*8)
      random2 = Math.floor(Math.random()*8)
      attempt += 1
    }
    if(absoluteGenerateJudge(random1,random2)){
      blocks[random1][random2].type=nextType
      nextType = (nextType+1)%3
    }
  }
}

const randomGenerate = () => {
  if(phase >= 3){
    if(gameTime % (fps*interval*10) == 0){
      if(1){//Math.random()>0.5){
        let random1 = Math.floor(Math.random()*8)
        let random2 = Math.floor(Math.random()*8)
        let determin = false
        let attempt = 0
        while(1){
          if(attempt<10){
            if(hardGenerateJudge(random1,random2)){
              break;
            }
          }else if(10<=attempt && attempt <= 20){
            if(easyGenerateJudge(random1,random2)){
              break;
            }
          }else{
            break;
          }
          random1 = Math.floor(Math.random()*8)
          random2 = Math.floor(Math.random()*8)
          attempt += 1
        }
        if(absoluteGenerateJudge(random1,random2)){
          let type = Math.floor(Math.random()*4) + 3
          console.log("item: " + type)
          blocks[random1][random2].type = type
        }
      }
    }
  }
}

const collision = () => {
  player.collision()
  vanishCircle.collision()
}





const phaseControl = () => {
  if(gameTime > 10*fps){
    phase = 2
    interval = 1.5
    player.speed = 5
  }
  if(gameTime > 20 * fps){
    phase = 3
    interval = 1
    player.speed = 6
  }
  if(gameTime > 30 * fps){
    phase = 4
    interval = 0.5
    player.speed = 8
  }
}

const sePlay = (targetType) => {
  switch(targetType){
      case RED:
        se_piano["C"].play()
        se_piano["C"]=new Audio("asset/se/2C.mp3")
        break;
      case GREEN:
        se_piano["E"].play()
        se_piano["E"]=new Audio("asset/se/2E.mp3")
        break;
      case BLUE:
        se_piano["G"].play()
        se_piano["G"]=new Audio("asset/se/2G.mp3")
        break;
      case VANISH:
        se_piano["VANISH"].play()
        se_piano["VANISH"]=new Audio("asset/se/2G.mp3")
        break;
      case RED_BOMB:
      case GREEN_BOMB:
      case BLUE_BOMB:
      default:
      se_piano["MISTAKE"].play()
      se_piano["MISTAKE"]=new Audio("asset/se/2G.mp3")
        break;
  }
}

const distance = (point1,point2) => {
  ret = Math.sqrt((point1.x-point2.x)**2 + (point1.y-point2.y)**2)
  return ret
}

const updateGameover = () => {
  if(gameover){
    if(keys._space){
      gameMode = GAME_RESULT
      spaceState = true
    }
  }

}
