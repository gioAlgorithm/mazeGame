"use client"
import React from 'react'
import style from "./TryAgain.module.scss"

// interface
interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  startTimer: ()=> void;
  setTryAgain: React.Dispatch<React.SetStateAction<boolean>>;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const TryAgain: React.FC<Props> = ({ setLevel, startTimer, setTryAgain, setNewRecord}) => {
  
  const handleStart = ()=>{
    setLevel("levelOne")
    startTimer()
    setTryAgain(false)
    setNewRecord(false)
  }
  
  return (
    <div className={style.tryAgain}>
      <div className={style.innerTryAgain}>
        <h1>YOU LOST!</h1>
        <p>Guide the red point through the maze, but don&apos;t touch the walls!</p>

        <button onClick={handleStart}>Try Again </button>
      </div>
    </div>
  )
}

export default TryAgain