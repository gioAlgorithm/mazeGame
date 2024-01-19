"use client"
import React from 'react'
import style from "./LevelThree.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelThree: React.FC<Props> = ({handleObstacleEnter, setLevel}) => {
  
  const handleWin = ()=>{
    setLevel('levelFour')
  }
  
  return (
    <div className={style.levelThree}>
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
      <div className={style.obstacle11} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle12} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle13} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle14} onMouseEnter={handleObstacleEnter} ></div>
      <div className={style.obstacle15} onMouseEnter={handleObstacleEnter} ></div>

      <h1 className={style.lvlName}>Level 3</h1>

      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelThree