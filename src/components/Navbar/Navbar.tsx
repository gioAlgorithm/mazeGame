import React from 'react'
import style from "./Navbar.module.scss"
import { Black_Ops_One } from 'next/font/google'

const inter = Black_Ops_One({
  weight: '400',
  subsets: ['latin'], 
});

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <h1 className={inter.className}>The Maze</h1>
    </div>
  )
}

export default Navbar