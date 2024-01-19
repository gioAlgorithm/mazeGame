"use client"
import React from 'react'
import style from "./LevelOne.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelOne: React.FC<Props> = ({handleObstacleEnter, setLevel}) => {

  const handleWin = ()=>{
    setLevel("levelTwo")
  }


  return (
    <div className={style.levelOne}>
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter} ></div>

      <div className={style.obstacle1} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle2} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle3} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle4} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle5} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle6} onMouseEnter={handleObstacleEnter} ></div>
      
      <h1 className={style.lvlName}>Level 1</h1>

      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelOne