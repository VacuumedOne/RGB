const drawTitle = () => {
  ctx.drawImage(title.img,-10,-10,WIDTH,HEIGHT)
  if(time%fps < fps/2){
    ctx.fillStyle="rgb(0,0,0)"
    ctx.font="30px 'Arial'"
    ctx.fillText("Press Space Key",230,300)
    ctx.font="8px 'Arial'"
  }
}

const updateTitle = () => {
  if(keys._space == false){
    spaceState = false
  }
  if(keys._space && spaceState == false){
    gameMode = GAME_PLAY
    spaceState = true
    initial()
  }
}
