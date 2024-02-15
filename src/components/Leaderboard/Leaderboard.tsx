"use client"
import React from 'react'
import style from "./Leaderboard.module.scss"
import Link from 'next/link'
import { Quantico } from 'next/font/google'

const quantico = Quantico({
  weight: ["400", '700'],
  subsets: ['latin']
})

const Leaderboard = () => {

  return (
    <Link href="/leaderboardPage" className={style.leaderboard}>
      <h1 className={quantico.className}>Leaderboard</h1>
    </Link>
  )
}

export default Leaderboard