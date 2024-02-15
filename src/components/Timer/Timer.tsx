'use client'
import React, { useContext, useEffect, useState } from 'react'
import style from "./Timer.module.scss"
import { UserContext } from '@/context/UserContext'
import { Quantico } from 'next/font/google'

const quantico = Quantico({
  weight: ["400", '700'],
  subsets: ['latin']
})

interface Props{
  time: string;
  winTime: string;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const Timer: React.FC<Props> = ({time, winTime, setNewRecord}) => {
  const [displayedBestTime, setDisplayedBestTime] = useState<number | null>(null);
  const {bestTime} = useContext(UserContext)

  // Convert the time strings into seconds for comparison
  const winTimeInSeconds = winTime
      .split(':')
      .map((part) => parseInt(part, 10))
      .reduce((total, part, index) => total + part * Math.pow(60, 2 - index), 0);
  
  useEffect(() => {
    
    if (bestTime !== null) {
      // Update displayedBestTime based on conditions
      if(displayedBestTime !== null && winTime !== '' && winTimeInSeconds / 60 < displayedBestTime){
        setDisplayedBestTime(winTimeInSeconds / 60);
        setNewRecord(true)
      }else if(winTime !== '' && displayedBestTime === null){
        setDisplayedBestTime(winTimeInSeconds / 60)
        setNewRecord(true)
      }else if(displayedBestTime !== null && displayedBestTime < winTimeInSeconds){
        setDisplayedBestTime(displayedBestTime)
      }
      else if (winTimeInSeconds / 60 < bestTime || displayedBestTime === null) {
        setDisplayedBestTime(winTimeInSeconds / 60);
        setNewRecord(true)
      } else if(winTimeInSeconds / 60 < displayedBestTime){
        setDisplayedBestTime(winTimeInSeconds / 60); // Update displayedBestTime if winTime is less than the current displayedBestTime
        setNewRecord(true)
      }else {
        setDisplayedBestTime(bestTime); // Display bestTime if it's less than or equal to winTime
      }
    } else {
      // If bestTime is null, display winTime if not an empty string
      if (displayedBestTime !== null && winTime !== '' && winTimeInSeconds / 60 < displayedBestTime) {
        setDisplayedBestTime(winTimeInSeconds / 60);
        setNewRecord(true)
      }else{
        if(winTime !== '' && displayedBestTime == null){
          setDisplayedBestTime(winTimeInSeconds / 60)
          setNewRecord(true)
        }
      }
    }
  }, [bestTime, winTime, displayedBestTime, winTimeInSeconds, setNewRecord]);

  // formating best time to string
  const formatBestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const bestTimeFormatted = displayedBestTime !== null ? formatBestTime(displayedBestTime) : '00:00';
  

  return (
    <div className={style.timer}>
      <div className={style.time}>
        <span className={quantico.className}>Time: <div>{time}</div></span>
      </div>
      <div className={style.bestTime}>
        <span className={quantico.className}>Best Time: {bestTimeFormatted}</span>
      </div>
    </div>
  )
}

export default Timer