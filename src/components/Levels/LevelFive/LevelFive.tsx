"use client"
import React from 'react'
import style from "./LevelFive.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelFive: React.FC<Props> = ({setLevel, handleObstacleEnter}) => {

  const handleWin = ()=>{
    setLevel("levelSix")
  }

  // function to generate the square container with divs
  const generateSquareContainer = (containerIndex: number) =>{
    const numSquares = 12; // adgust this to the desired number of squares
    const squares = Array.from({ length: numSquares }, (_, index) => (
        <div key={index} onMouseEnter={handleObstacleEnter}></div>
    ));

    return (
        <div key={containerIndex} className={style[`squareContainer${containerIndex}`]}>
          {squares}
        </div>
    );
  }
  // Create an array of container indices to loop over
  const containerIndices = Array.from({ length: 18 }, (_, index) => index + 1);


  return (
    <div className={style.levelFive}>
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter}></div>

      <div className={style.obstacle1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle2} onMouseEnter={handleObstacleEnter}></div>

      {containerIndices.map((containerIndex) => generateSquareContainer(containerIndex))}

      <h1 className={style.lvlName}>Level 5</h1>

      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelFive