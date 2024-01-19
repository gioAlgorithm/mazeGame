"use client"
import React from 'react'
import style from "./LevelSix.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelSix: React.FC<Props> = ({setLevel, handleObstacleEnter}) => {
  
  const handleWin = () =>{
    setLevel("levelSeven")
  }
  

  return (
    <div className={style.levelSix}>
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter}></div>

      <div className={style.obstacle1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle2} onMouseEnter={handleObstacleEnter}></div>

      <div className={style.rhombus1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus3} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus4} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus5} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus6} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus7} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus8} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus9} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus10} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus11} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus12} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus13} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus14} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus15} onMouseEnter={handleObstacleEnter}></div>

      <h1 className={style.lvlName} >Level 6</h1>
      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelSix