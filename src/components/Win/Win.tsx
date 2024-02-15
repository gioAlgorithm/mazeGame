"use client"
import React from 'react'
import style from "./Win.module.scss"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import SignInSuggest from './SignInSuggest';
import { Black_Ops_One } from 'next/font/google';
import { Quantico } from 'next/font/google'

const quantico = Quantico({
  weight: ["400", '700'],
  subsets: ['latin']
})

const blackOps = Black_Ops_One({
  weight: ["400"],
  subsets: ['latin']
})


// interface
interface Props{
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  winTime: string;
  startTimer: ()=> void;
  newRecord: boolean;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const Win: React.FC<Props> = ({setStartGame, setLevel, winTime, startTimer, newRecord, setNewRecord}) => {

  const [user, loading] = useAuthState(auth)

  const handleStart = ()=>{
    setStartGame(true)
    setLevel("levelOne")
    startTimer()
    setNewRecord(false)
  }
  return (
    <div className={style.winContainer}>
      <div className={style.innerWin}>
        <h1 className={blackOps.className}>YOU WON!</h1>
        {newRecord && <div className={style.newRecord}>New Record</div>}
        <div className={style.winTime} style={!newRecord ? {marginTop: "24px"} : {}}><span className={quantico.className}>Time: {winTime}</span></div>
        {!user && !loading &&
          <SignInSuggest />
        }
        <button onClick={handleStart} style={!user ? {marginTop: "70px"} : {}}>Play Again</button>
      </div>
    </div>
  )
}

export default Win