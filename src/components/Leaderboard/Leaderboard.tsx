"use client"
import React from 'react'
import style from "./Leaderboard.module.scss"
import Link from 'next/link'

const Leaderboard = () => {

  return (
    <Link href="/leaderboardPage" className={style.leaderboard}>
      <h1>Leaderboard</h1>
    </Link>
  )
}

export default Leaderboard