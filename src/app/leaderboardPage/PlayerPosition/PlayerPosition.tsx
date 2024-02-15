import React, { useContext } from 'react'
import style from "./PlayerPosition.module.scss"
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/utils/firebase'
import Image from 'next/image'
import ProfileIcon from '@/components/ProfileIcon/ProfileIcon'
import { UserContext } from '@/context/UserContext'
import PlayerPositionLoading from './PlayerPositionLoading'

const PlayerPosition = () => {
  const [user, loading] = useAuthState(auth)
  const {bestTime, totalGames, leaderboard, loadingLeaderboard} = useContext(UserContext)

  const getLeaderboardPosition = () => {
    if (!loading && bestTime) {
      const userPosition = leaderboard.findIndex(user => user.id === auth.currentUser?.uid);
      if (userPosition === -1) {
        // User not in top 10
        if(bestTime <= 660) return "Top - 15"
        else if (bestTime > 660 && bestTime <= 700) return "Top - 20";
        else if (bestTime > 700 && bestTime <= 750) return "Top - 50";
        else if (bestTime > 750 && bestTime <= 800) return "Top - 100";
        else if (bestTime > 800 && bestTime <= 850) return "Top 25%";
        else if (bestTime > 850 && bestTime <= 900) return "Top 50%";
        else if (bestTime > 900 && bestTime <= 950) return "Top 75%";
        else if (bestTime > 950) return "Top 90%";
      } else {
        // User in top 10
        return userPosition + 1;
      }
    }else{
      return "None"
    }
  };
  

  // format best time
  const formatBestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const bestTimeFormatted = bestTime !== null ? formatBestTime(bestTime) : '00:00';

  return (
    <div className={style.playerPosition}>
      <section className={style.titleContainer}>
        <p className={style.rankTitle}>Rank</p>
        <p className={style.profileTitle}>Your Profile</p>
        <p className={style.bestTimeTitle}>Best Time</p>
        <p className={style.matchesPlayedTitle}>Matches Played</p>
      </section>
      {!loading && 
        <section className={style.playerPositionStat}>
          <div className={style.rank}>{!loadingLeaderboard && getLeaderboardPosition()}</div>
          <div className={style.profileInfo}>
            {user?.photoURL ? <Image alt='profile' width={30} height={30} src={user?.photoURL} /> : <ProfileIcon width={`30`} height={`30`} fontSize={'1'} title={user?.displayName}/>}
            <span>{user?.displayName && user?.displayName}</span>
          </div>
          <div className={style.bestTime}>{bestTimeFormatted}</div>
          <div className={style.totalGames}>{totalGames || 0}</div>
        </section>
      }
      {loading &&
        <PlayerPositionLoading />
      }
    </div>
  )
}

export default PlayerPosition