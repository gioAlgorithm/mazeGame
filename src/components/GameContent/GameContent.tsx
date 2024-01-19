'use client'
import React, {useEffect, useState} from 'react'
import style from "./GameContent.module.scss"
import Timer from '../Timer/Timer'
import Game from '../Game/Game'
import Leaderboard from '../Leaderboard/Leaderboard'

const GameContent = () => {

  // timerLogic
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isTimerRunning) {
      const startTime = Date.now();

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const time = formatTime(elapsedTime)

  return (
    <div className={style.gameContent}>
      <div className={style.timerGame}>
        <Timer time={time} />
        <Game startTimer={startTimer} stopTimer={stopTimer} time={time} />
      </div>
      <Leaderboard />
    </div>
  )
}

export default GameContent