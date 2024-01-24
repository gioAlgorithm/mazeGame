'use client'
import React from 'react'
import style from "./Timer.module.scss"

interface Props{
  time: string
}

const Timer: React.FC<Props> = ({time}) => {
  return (
    <div className={style.timer}>
      <div className={style.time}>
        <span>Time: <div>{time}</div></span>
      </div>
      <div className={style.lastTime}>
        <span>Last Time: 00:00</span>
      </div>
      <div className={style.bestTime}>
        <span>Best Time: 00:00</span>
      </div>
    </div>
  )
}

export default Timer