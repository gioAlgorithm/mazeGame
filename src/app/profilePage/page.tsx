"use client"
import React, {useEffect, useContext} from 'react'
import style from "./profilePage.module.scss"
import Image from 'next/image'
import { useAuthState } from 'react-firebase-hooks/auth'
import ProfileIcon from '../../components/ProfileIcon/ProfileIcon'
import { FaRegPenToSquare } from "react-icons/fa6";
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { auth, db} from "../../utils/firebase";
import HistoryContainer from '@/components/HistoryContainer/HistoryContainer'
import StatContainer from '@/components/StatContainer/StatContainer'
import {metadata} from "./metaData"
import { doc, getDoc } from 'firebase/firestore';

// icons
import { IoMdArrowDropleft } from "react-icons/io";
import { UserContext } from '@/context/UserContext'
import { ModalContext } from '@/context/modalContext'



const ProfilePage = () => {
  const [user, loading] = useAuthState(auth)

  const {gameHistory, loadingSkeleton, bestTime, totalWins, totalTime, totalGames, levelCount, fetchData, leaderboard, loadingLeaderboard } = useContext(UserContext)
  
  // importing context for modal
  const { setChangeNameActive, setWarningNameActive, setGetNameDate } = useContext(ModalContext)

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

  // changing metadata
  useEffect(() => {
    if (metadata.title) {
      document.title = String(metadata.title)
    }
  }, []);

  const handleNameChange = async () => {
    try {
      if (!user) return;
  
      // Retrieve the user's document from Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
  
  
      if (userDoc.exists()) {
        const newNameDate = userDoc.data().newNameDate;
        
  
        // Check if newNameDate is defined before accessing its properties
        if (newNameDate) {

          setGetNameDate(newNameDate.toDate())
          // Calculate the date two weeks ago
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
          // Check if newNameDate is within the last two weeks
          if (newNameDate.toDate() > twoWeeksAgo) {
            // Display warning modal
            setWarningNameActive(true);
            return;
          }
        }
  
        // If newNameDate doesn't exist or it's been more than two weeks, allow name change
        setChangeNameActive(true);
      }
    } catch (error) {
      console.error("Error checking name change eligibility: ", error);
    }
  };


  return (
    <div className={style.profilePage}>
      <div className={style.profileContainer}>
        <div className={style.profileImageContainer}>
          <div className={style.profileImage}>
            {user?.photoURL ? <Image id='profileImage' alt='profile' width={100} height={100} src={user?.photoURL} priority/> : <ProfileIcon width={`100`} height={`100`} fontSize={'2.2'} title={user?.displayName}/>}
          </div>
          <span className={`${style.profileName}  ${loading && style.profileNameLoading}`} id='profileName'>
            {user?.displayName && user?.displayName}

            {!loading &&
              <div className={style.nameChange} onClick={handleNameChange}>
                <FaRegPenToSquare />
              </div>
            }
          </span>
          
          
        </div>
        <Link className={style.back} href="/"><IoMdArrowDropleft /> Back</Link>
        <div className={style.profileContainerFooter}>
            
        </div>
      </div>

      {/* profile page statistic and content */}
      <div className={style.profilePageContent}>
          
        <HistoryContainer gameHistory={gameHistory} loadingSkeleton={loadingSkeleton} />
          
        <StatContainer loadingSkeleton={loadingSkeleton} bestTime={bestTime} totalWins={totalWins} totalTime={totalTime} totalGames={totalGames} levelCount={levelCount} leaderboard={leaderboard} loadingLeaderboard={loadingLeaderboard} />
      </div>
      <p className={style.copyright}>Copyright © 2024 Giorgi Machitadze All Rights Reserved.</p>
    </div>
  )
}

export default ProfilePage