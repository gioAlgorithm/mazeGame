"use client"
import React, { useState } from 'react'
import style from "./Leaderboard.module.scss"
import { IoMdArrowDropdown } from "react-icons/io";

const Leaderboard = () => {

  const [active, setActive] = useState(true)

  const handleActive = ()=>{
    setActive(!active)
  }

  return (
    <div className={style.leaderboard}>
      <h1 onClick={handleActive}>Leaderboard <span> <IoMdArrowDropdown className={`${style.arrow} ${active && style.activeArrow}`} /> </span></h1>

      
        <div className={`${style.leaderboardMenu} ${active && style.leaderboardMenuActive}`}>
        
        </div>
      
    </div>
  )
}

export default Leaderboard