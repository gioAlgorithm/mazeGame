'use client'
import React from 'react'
import style from "./Navbar.module.scss"
import { Black_Ops_One } from 'next/font/google'
import SigninButton from '../SigninButton/Signin';
import SignUpButton from '../SignUpButton/SignUp';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"
import Profile from '../Profile/Profile';
import Link from 'next/link';

const inter = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
});

const Navbar = () => {
  // user from firebase
  const [user, loading] = useAuthState(auth)


  return (
    <div className={style.navbar}>
      <div className={style.innerNavbar}>
        <Link href="/" className={inter.className}>The Maze</Link>
        {!user && 
          <div className={style.section}>
            <SigninButton />
            <SignUpButton />
          </div>
        }
        {user &&
          <Profile />
        }
      </div>
    </div>
  )
}

export default Navbar