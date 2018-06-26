const draw = () => {
  ctx.clearRect(-10,-10,WIDTH,HEIGHT)
  ctx.fillStyle = color["BLACK"]
  ctx.fillRect(-10,-10,500,500)
  ctx.clearRect(0,0,480,480)
  for(let i=0;i<BOX_NUM;i++){
    for(let j=0;j<BOX_NUM;j++){
      if(blocks[i][j].type != -1){
        blocks[i][j].draw();
      }
    }
  }
  player.draw()
  vanishCircle.draw()
  display()
  drawGameover()
}

const display = () => {
  ctx.fillStyle="rgb(0,0,0)"
  ctx.font="18px 'Arial'"
  ctx.fillText("Next is ...",520,140)
  if(targetType == RED){
    ctx.drawImage(tiles["RED"],540,180,60,60)
  }else if(targetType == BLUE){
    ctx.drawImage(tiles["BLUE"],540,180,60,60)
  }else if(targetType == GREEN){
    ctx.drawImage(tiles["GREEN"],540,180,60,60)
  }

  ctx.fillType="rgb(0,0,0)"
  ctx.fillText("Score: " + score ,540, 300)
}

const drawGameover = () => {
  if(gameover == true){
    ctx.font="100px 'Arial'"
    ctx.fillStyle = "rgb(20,20,20)"
    ctx.fillText("GameOver",100,250)
    if(gameTime%fps < fps/2){
      ctx.fillStyle=color["BLACK"]
      ctx.font="20px 'Arial'"
      ctx.fillText("Press Space Key Next",250,300)
      ctx.font="8px 'Arial'"
    }
  }
}
