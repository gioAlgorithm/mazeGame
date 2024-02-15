"use client"
import React, {useEffect, useContext} from 'react'
import style from "./profilePage.module.scss"
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth} from "../../utils/firebase";
import HistoryContainer from '@/components/HistoryContainer/HistoryContainer'
import StatContainer from '@/components/StatContainer/StatContainer'

// icons
import { IoMdArrowDropleft } from "react-icons/io";
import { UserContext } from '@/context/UserContext'

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth)

  const {gameHistory, loadingSkeleton, bestTime, totalWins, totalTime, totalGames, levelCount, fetchData, leaderboard } = useContext(UserContext)
  
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);

  // fetch data whenever user rotates to profile page!
  useEffect(() => {
    fetchData();
    console.log("fetch data")
  }, [fetchData]);



  return (
    <div className={style.profilePage}>
      <div className={style.profileContainer}>
        <div className={style.profileImageContainer}>
          <div className={style.profileImage}>
            {user?.photoURL ? <Image id='profileImage' alt='profile' width={100} height={100} src={user?.photoURL} priority/> : <ProfileIcon width={`100`} height={`100`} fontSize={'2.2'} title={user?.displayName}/>}
          </div>
          <span className={`${style.profileName}  ${loading && style.profileNameLoading}`} id='profileName'>
            {user?.displayName && user?.displayName}
          </span>
        </div>
        <Link className={style.back} href="/"><IoMdArrowDropleft /> Back</Link>
        <div className={style.profileContainerFooter}>
          
        </div>
      </div>

      {/* profile page statistic and content */}
      <div className={style.profilePageContent}>
        
        <HistoryContainer gameHistory={gameHistory} loadingSkeleton={loadingSkeleton} />
        
        <StatContainer loadingSkeleton={loadingSkeleton} bestTime={bestTime} totalWins={totalWins} totalTime={totalTime} totalGames={totalGames} levelCount={levelCount} leaderboard={leaderboard} />
      </div>
      <p className={style.copyright}>Copyright © 2024 Giorgi Machitadze All Rights Reserved.</p>
    </div>
  )
}

export default ProfilePage