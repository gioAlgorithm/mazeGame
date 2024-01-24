"use client"
import React, {useEffect} from 'react'
import style from "./profilePage.module.scss"
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from "../../utils/firebase"
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
// icons
import { IoMdArrowDropleft } from "react-icons/io";
import { FaHistory } from "react-icons/fa";
import { IoStatsChartOutline } from "react-icons/io5";

const ProfilePage = () => {
  const [user, loading] = useAuthState(auth)
  const router = useRouter()

  useEffect(() => {
    if (!user && !loading) {
      router.push('/');
    }
  }, [user, loading, router]);


  return (
    <div className={style.profilePage}>
      <div className={style.profileContainer}>
        <div className={style.profileImageContainer}>
          <div className={style.profileImage}>
            {user?.photoURL ? <Image id='profileImage' alt='profile' width={100} height={100} src={user?.photoURL} priority/> : <ProfileIcon width={`100`} height={`100`} fontSize={'2.2'} />}
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
        <div className={style.history}>
          <div className={style.historyHeader}>
            <h1>History</h1>
            <FaHistory />
          </div>
        </div>

        <div className={style.statistic}>
          <div className={style.statisticHeader}>
            <h1>Stats</h1>
            <IoStatsChartOutline />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage