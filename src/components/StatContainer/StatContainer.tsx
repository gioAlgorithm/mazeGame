'use client'
import React from 'react';
import style from './StatContainer.module.scss';
import { IoStatsChartOutline } from 'react-icons/io5';
import StatLoading from './StatLoading';
import { LeaderboardUser } from '@/utils/fetchLeaderboard';
import {auth} from "../../utils/firebase"
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext' ,'greek', 'latin-ext']
})

interface Props{
  loadingSkeleton: boolean;
  totalWins: number | null;
  bestTime: number | null;
  totalTime: number | null;
  totalGames: number | null;
  levelCount: Record<string, number | null>
  leaderboard: LeaderboardUser[]
}


const StatContainer: React.FC<Props> = ({loadingSkeleton, totalWins, bestTime, totalTime, totalGames, levelCount, leaderboard}) => {
  // 1. Total Matches Played
  const totalMatchesPlayed = totalGames || 0;
  // 2. Total Time Played
  const totalTimeInSeconds = totalTime || 0;
  console.log(leaderboard)

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    const formattedTime = [];
  
    if (hours > 0) {
      formattedTime.push(`${hours}hr`);
    }
  
    if (minutes > 0 || (hours === 0 )) {
      formattedTime.push(`${minutes}m`);
    }
  
    if ((seconds > 0 && hours === 0 ) || minutes === 0) {
      formattedTime.push(`${seconds}s`);
    }
  
    return formattedTime.length > 0 ? formattedTime.join(' ') : '0s';
  };
  
  // Usage example
  const totalTimeFormatted = formatTime(totalTimeInSeconds);

  // 3. Best Time
  const formatBestTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const bestTimeFormatted = bestTime !== null ? formatBestTime(bestTime) : '00:00';

  // 4. rank logic 
  const getLeaderboardPosition = () => {
    if (!loadingSkeleton && bestTime) {
      const userPosition = leaderboard.findIndex(user => user.id === auth.currentUser?.uid);
      if (userPosition === -1) {
        // User not in top 10
        if(bestTime <= 660) return "Top - 15"
        else if (bestTime > 660 && bestTime <= 700) return "Top - 20";
        else if (bestTime > 700 && bestTime <= 750) return "Top - 50";
        else if (bestTime > 750 && bestTime <= 800) return "Top - 100";
        else if (bestTime > 800 && bestTime <= 850) return "Top - 25%";
        else if (bestTime > 850 && bestTime <= 900) return "Top - 50%";
        else if (bestTime > 900 && bestTime <= 950) return "Top - 75%";
        else if (bestTime > 950) return "Top - 90%";
      } else {
        // User in top 10
        return `#${userPosition + 1}`;
      }
    }else{
      return "None"
    }
  };
  // 5. Most Lost Level
  const findLevelWithMaxValue = (levelCount: Record<string, number | null>): string | null => {
    let maxLevel: string | null = null;
    let maxValue: number | null = null;
  
    for (const [level, value] of Object.entries(levelCount)) {
      if (value !== null && (maxValue === null || value > maxValue)) {
        maxLevel = level;
        maxValue = value;
      }
    }
  
    return maxLevel;
  };


  // Win percentage
  const winPercentage = totalWins !== null ? ((totalWins / totalMatchesPlayed) * 100).toFixed(2) : '0.00';

  // Lose percentage
  const losePercentage = totalWins !== null ? (100 - Number(winPercentage)).toFixed(2) : '100.00';

  return (
    <div className={style.statistic}>
      <div className={style.statisticHeader}>
        <h1 className={roboto.className}>Stats</h1>
        <IoStatsChartOutline />
      </div>
      <div className={style.statContent}>
        {loadingSkeleton ? (
          <StatLoading />
          ) : (
            <>
              <section>
                <p className={style.title}>Total Matches</p>
                <p className={style.stat}>{totalMatchesPlayed}</p>
              </section>
              <section>
                <p className={style.title}>Total Time Played</p>
                <p className={style.stat}>{totalTimeFormatted}</p>
              </section>
              <section>
                <p className={style.title}>Best Time</p>
                <p className={style.stat}>{bestTimeFormatted}</p>
              </section>
              <section>
                <p className={style.title}>Rank</p>
                <p className={style.stat}>{getLeaderboardPosition()}</p>
              </section>
              <section>
                <p className={style.title}>Wins</p>
                <p className={style.stat}>{totalWins || '0'}</p>
              </section>
              <section>
                <p className={style.title}>Most Lost Level</p>
                <p className={style.stat}>{findLevelWithMaxValue(levelCount) || "None"}</p>
              </section>
              <section>
                <p className={style.title}>Win %</p>
                <p className={style.stat}>{winPercentage || "0.00"}%</p>
              </section>
              <section>
                <p className={style.title}>Lose %</p>
                <p className={style.stat}>{losePercentage || "0.00"}%</p>
              </section>
            </>
          )}
        
      </div>
    </div>
  );
};

export default StatContainer;