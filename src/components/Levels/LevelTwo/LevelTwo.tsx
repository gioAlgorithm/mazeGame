"use client"
import React from 'react'
import style from "./LevelTwo.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}
const LevelTwo: React.FC<Props> = ({handleObstacleEnter, setLevel}) => {

  const handleWin = ()=>{
    setLevel("levelThree")
  }

  return (
    <div className={style.levelTwo}>
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
      <div className={style.obstacle7} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle8} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle9} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle10} onMouseEnter={handleObstacleEnter} ></div>

      <h1 className={style.lvlName}>Level 2</h1>

      <span className={style.win} onMouseEnter={handleWin}> </span>
    </div>
  )
}

export default LevelTwo