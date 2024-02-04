'use client'
import React from 'react'
import style from "./leaderboardPage.module.scss"
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../utils/firebase"
import Image from 'next/image'
import ProfileIcon from '@/components/ProfileIcon/ProfileIcon'

const LeaderboardPage = () => {
  const [user] = useAuthState(auth)

  return (
    <div className={style.leaderboardPage}>
      {user &&
        <div className={style.playerPosition}>
          <section className={style.titleContainer}>
            <p className={style.rankTitle}>Rank</p>
            <p className={style.profileTitle}>Your Profile</p>
          </section>
          <section className={style.playerPositionStat}>
            <div className={style.rank}>11</div>
            <div className={style.profileInfo}>
              {user?.photoURL ? <Image alt='profile' width={30} height={30} src={user?.photoURL} /> : <ProfileIcon width={`40`} height={`40`} fontSize={'1'}/>}
              <span>{user?.displayName && user?.displayName}</span>
            </div>
            
          </section>
        </div>
      }
    </div>
  )
}

export default LeaderboardPage