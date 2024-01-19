'use client'
import React from 'react'
import style from "./Timer.module.scss"
import { Quantico } from 'next/font/google'

const inter = Quantico({
  weight: ['700'],
  subsets: ['latin']
})

interface Props{
  time: string
}

const Timer: React.FC<Props> = ({time}) => {
  return (
    <div className={style.timer}>
      <div className={style.time}>
        <span className={inter.className}>Time: <div>{time}</div></span>
      </div>
      <div className={style.lastTime}>
        <span className={inter.className}>Last Time: 00:00</span>
      </div>
      <div className={style.bestTime}>
        <span className={inter.className}>Best Time: 00:00</span>
      </div>
    </div>
  )
}

export default Timer