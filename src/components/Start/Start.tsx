"use client"
import React from 'react'
import style from "./Start.module.scss"

// interface
interface Props{
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  startTimer: ()=> void;
}

const Start: React.FC<Props> = ({ setStartGame, setLevel, startTimer}) => {

  const handleStart = ()=>{
    setStartGame(true)
    setLevel("levelOne")
    startTimer()
  }

  return (
    <div className={style.startContainer}>
      <div className={style.innerStart}>
        <h1>THE MAZE</h1>
        <p>Guide the red point through the maze, but don&apos;t touch the walls!</p>

        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  )
}

export default Start