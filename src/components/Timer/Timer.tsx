'use client'
import React, { useContext } from 'react'
import style from "./Timer.module.scss"
import { UserContext } from '@/context/UserContext'

interface Props{
  time: string
}

const Timer: React.FC<Props> = ({time}) => {
  const {bestTime} = useContext(UserContext)
  const formatBestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const bestTimeFormatted = bestTime !== null ? formatBestTime(bestTime) : 'N/A';
  return (
    <div className={style.timer}>
      <div className={style.time}>
        <span>Time: <div>{time}</div></span>
      </div>
      <div className={style.bestTime}>
        <span>Best Time: {bestTimeFormatted}</span>
      </div>
    </div>
  )
}

export default Timer