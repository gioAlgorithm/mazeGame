'use client'
import React from 'react'
import dynamic from 'next/dynamic';
import style from "./Navbar.module.scss"
import SigninButton from '../SigninButton/Signin';
import SignUpButton from '../SignUpButton/SignUp';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"
import Link from 'next/link';
import ProfileLoading from '../Profile/ProfileLoading/ProfileLoading';
import { Black_Ops_One } from 'next/font/google';

// preventing server side for profile to prevent hydratation
const Profile = dynamic(() => import('../Profile/Profile'), { ssr: false });

const blackOps = Black_Ops_One({
  weight: ["400"],
  subsets: ['latin']
})

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className={style.navbar}>
      <div className={style.innerNavbar}>
        <Link href="/" className={blackOps.className}>
          The Maze
        </Link>
        {!user && !loading && (
          <div className={style.section}>
            <SigninButton />
            <SignUpButton />
          </div>
        )}
        {user && !loading && <Profile />}
        {loading && <ProfileLoading />}
      </div>
    </div>
  );
};

export default Navbar;