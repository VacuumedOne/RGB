const drawResult = () => {
  ctx.drawImage(result.img,-10,-10,WIDTH,HEIGHT)
    ctx.fillStyle="rgb(0,0,0)"
    ctx.font="30px 'Arial'"
    ctx.fillText("Your Score is ...",150,270)
    ctx.font="40px 'Arial'"
    ctx.fillText(score,500,270)
    if(time%fps < fps/2){
      ctx.fillStyle="rgb(0,0,0)"
      ctx.font="20px 'Arial'"
      ctx.fillText("Press Space Key Next",400,430)
      ctx.font="8px 'Arial'"
    }
}

const updateResult = () => {
  if(keys._space == false){
    spaceState = false
  }

  if(keys._space && spaceState == false){
    gameMode = GAME_TITLE
    spaceState = true
  }
}
