"use client"
import React from 'react'
import style from "./Win.module.scss"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/utils/firebase';
import SignInSuggest from './SignInSuggest';


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
        <h1>YOU WON!</h1>
        {newRecord && <div className={style.newRecord}>New Record</div>}
        <div className={style.winTime} style={!newRecord ? {marginTop: "24px"} : {}}>Time: {winTime}</div>
        {!user && !loading &&
          <SignInSuggest />
        }
        <button onClick={handleStart} style={!user ? {marginTop: "70px"} : {}}>Play Again</button>
      </div>
    </div>
  )
}

export default Win