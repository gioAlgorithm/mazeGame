"use client"
import React from 'react'
import style from "./TryAgain.module.scss"
import { Black_Ops_One } from 'next/font/google';
import { Russo_One } from 'next/font/google';

const blackOps = Black_Ops_One({
  weight: ["400"],
  subsets: ['latin']
})

const russoOne = Russo_One({
  weight: ['400'],
  subsets:['latin']
})

// interface
interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  startTimer: ()=> void;
  setTryAgain: React.Dispatch<React.SetStateAction<boolean>>;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>
}

const TryAgain: React.FC<Props> = ({ setLevel, startTimer, setTryAgain, setNewRecord, setStartGame}) => {
  
  const handleStart = ()=>{
    setLevel("levelOne")
    startTimer()
    setTryAgain(false)
    setNewRecord(false)
    setStartGame(true)
  }
  
  return (
    <div className={style.tryAgain}>
      <div className={style.innerTryAgain}>
      <h1 className={blackOps.className}>YOU LOST!</h1>
        <span className={style.guide}><p className={russoOne.className}>Guide the red point through the maze, but don&apos;t touch the walls!</p></span>

        <button onClick={handleStart}>Try Again </button>
      </div>
    </div>
  )
}

export default TryAgain