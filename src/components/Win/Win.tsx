import React from 'react'
import style from "./Win.module.scss"
import { Black_Ops_One } from 'next/font/google'

const inter = Black_Ops_One({
  weight: '400',
  subsets: ['latin'], 
});

// interface
interface Props{
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  winTime: string;
  startTimer: ()=> void
}

const Win: React.FC<Props> = ({setStartGame, setLevel, winTime, startTimer}) => {

  const handleStart = ()=>{
    setStartGame(true)
    setLevel("levelOne")
    startTimer()
  }
  return (
    <div className={style.winContainer}>
      <div className={style.innerWin}>
        <h1 className={inter.className}>YOU WON!</h1>

        <div>{winTime}</div>
        <button onClick={handleStart}>Play Again</button>
      </div>
    </div>
  )
}

export default Win