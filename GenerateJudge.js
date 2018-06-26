const hardGenerateJudge = (x,y) => {
  ret = true
  if(x!=0 && y!= 0){
    if(blocks[x-1][y-1].type != SPACE){
      ret = false
    }

  }
  if(x!=0){
    if(blocks[x-1][y].type != SPACE){
      ret = false
    }
  }
  if(x!=0 && y!= BOX_NUM-1){
    if(blocks[x-1][y+1].type != SPACE){
      ret = false
    }
  }
  if(y!= 0){
    if(blocks[x][y-1].type != SPACE){
      ret = false
    }
  }
  if(blocks[x][y].type != SPACE){
    ret = false
  }
  if(y!= BOX_NUM-1){
    if(blocks[x][y+1].type != SPACE){
      ret = false
    }
  }
  if(x!=BOX_NUM-1 && y!= 0){
    if(blocks[x+1][y-1].type != SPACE){
      ret = false
    }
  }
  if(x!=BOX_NUM-1){
    if(blocks[x+1][y].type != SPACE){
      ret = false
    }
  }
  if(x!=BOX_NUM-1 && y!= BOX_NUM-1){
    if(blocks[x+1][y+1].type != SPACE){
      ret = false
    }
  }
  let posx = Math.floor((player.point.x)/BOX)
  let posy = Math.floor((player.point.y)/BOX)
  if(x==posx && y==posy){
    ret = false
  }
  return ret
}

const easyGenerateJudge = (x,y) => {
  ret = true
  if(x!=0){
    if(blocks[x-1][y].type != SPACE){
      ret = false
    }
  }
  if(y!= 0){
    if(blocks[x][y-1].type != SPACE){
      ret = false
    }
  }
  if(blocks[x][y].type != SPACE){
    ret = false
  }
  if(y!= BOX_NUM-1){
    if(blocks[x][y+1].type != SPACE){
      ret = false
    }
  }
  if(x!=BOX_NUM-1){
    if(blocks[x+1][y].type != SPACE){
      ret = false
    }
  }
  if(x==player.curPoint.x && y==player.curPoint.y){
    ret = false
  }
  return ret
}

const absoluteGenerateJudge = (x,y) => {
  ret = true
  if(x==player.curPoint.x && y==player.curPoint.y){
    ret = false
  }
  if(x==player.curPoint.x+1 && y==player.curPoint.y){
    ret = false
  }
  if(x==player.curPoint.x-1 && y==player.curPoint.y){
    ret = false
  }
  if(x==player.curPoint.x && y==player.curPoint.y+1){
    ret = false
  }
  if(x==player.curPoint.x && y==player.curPoint.y-1){
    ret = false
  }
  return ret
}
