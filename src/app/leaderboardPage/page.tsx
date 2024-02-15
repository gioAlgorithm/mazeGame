'use client'
import React, { useContext } from 'react'
import style from "./leaderboardPage.module.scss"
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../utils/firebase"
import PlayerPosition from './PlayerPosition/PlayerPosition'
import { MdOutlineLeaderboard } from "react-icons/md";
import { UserContext } from '@/context/UserContext'
import Image from 'next/image'
import ProfileIcon from '@/components/ProfileIcon/ProfileIcon'
import LoadingLeaderboard from './LoadingLeaderboard'


const LeaderboardPage = () => {
  const [user, loading] = useAuthState(auth)
  // const [leaderboardData] =  useContext(UserContext)
  const {leaderboard, loadingLeaderboard} = useContext(UserContext)
  console.log(leaderboard)
  
  return (
    <div className={style.leaderboardPage}>
      {(user || loading) && 
        <PlayerPosition />
      }

      <div className={style.leaderboard}>
        <div className={style.leaderboardHeader}>
          <MdOutlineLeaderboard />
          <h1>MAZE LEADERBOARD</h1>
        </div>
        <div className={style.titleContainer}>
          <p className={style.rankTitle}>Rank</p>
          <p className={style.profileTitle}>Player Profile</p>
          <p className={style.bestTimeTitle}>Best Time</p>
          <p className={style.matchesPlayedTitle}>Matches Played</p>
        </div>
        <div className={style.leaderboardContent}>
          {loadingLeaderboard && <LoadingLeaderboard />}
          {leaderboard.map((item, index)=>{

            // format best time
            const formatBestTime = (totalSeconds: number) => {
              const minutes = Math.floor(totalSeconds / 60);
              const seconds = totalSeconds % 60;
      
              return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };

            const bestTimeFormatted = item.bestTime !== null ? formatBestTime(item.bestTime) : '00:00';

            return(
              <section key={item.id} className={style.userProfile} style={{background: index % 2 === 0 ? 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(255,255,255,0.1))' : 'none',}}>
                <div className={style.rank}>{index + 1}</div>
                <div className={style.profileInfo}>
                  {item.imageUrl ? <Image alt='profile' width={30} height={30} src={item.imageUrl} /> : <ProfileIcon width={`30`} height={`30`} fontSize={'1'} title={item.displayName}/>}
                  <span>{item.displayName && item.displayName}</span>
                </div>
                <div className={style.bestTime}>{bestTimeFormatted}</div>
                <div className={style.totalGames}>{item.totalGames || '0'}</div>
              </section>
            )
          })
          }
        </div>

      </div>

      <p className={style.copyright}>Copyright © 2024 Giorgi Machitadze All Rights Reserved.</p>
    </div>
  )
}

export default LeaderboardPage