'use client'
import React from 'react';
import style from './StatContainer.module.scss';
import { IoStatsChartOutline } from 'react-icons/io5';
import StatLoading from './StatLoading';

interface Props{
  loadingSkeleton: boolean;
  totalWins: number | null;
  bestTime: number | null;
  totalTime: number | null;
  totalGames: number | null;
  levelCount: Record<string, number | null>
}


const StatContainer: React.FC<Props> = ({loadingSkeleton, totalWins, bestTime, totalTime, totalGames, levelCount}) => {
  // 1. Total Matches Played
  const totalMatchesPlayed = totalGames || 0;
  // 2. Total Time Played
  const totalTimeInSeconds = totalTime || 0;

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

  const bestTimeFormatted = bestTime !== null ? formatBestTime(bestTime) : 'N/A';

  // 4. rank logic 

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

  // format level names
  const formatLevelName = (level: string | null): string | null => {
    const numberMap: Record<string, string> = {
      one: '1',
      two: '2',
      three: '3',
      four: '4',
      five: '5',
      six: '6',
      seven: '7',
      eight: '8',
      nine: '9',
      ten: '10',
    };

    const numberMatch = level !== null && level.match(/one|two|three|four|five|six|seven|eight|nine|ten/i);

    if (numberMatch) {
      const spelledOutNumber = numberMatch[0].toLowerCase();
      const numericValue = numberMap[spelledOutNumber];
      return `Level ${numericValue}`;
    }

    return level; // Return the original level name if no match is found
  };

  // Win percentage
  const winPercentage = totalWins !== null ? ((totalWins / totalMatchesPlayed) * 100).toFixed(2) : '0.00';

  // Lose percentage
  const losePercentage = totalWins !== null ? (100 - Number(winPercentage)).toFixed(2) : '100.00';

  return (
    <div className={style.statistic}>
      <div className={style.statisticHeader}>
        <h1>Stats</h1>
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
                <p className={style.stat}>#6</p>
              </section>
              <section>
                <p className={style.title}>Wins</p>
                <p className={style.stat}>{totalWins || '0'}</p>
              </section>
              <section>
                <p className={style.title}>Most Lost Level</p>
                <p className={style.stat}>{findLevelWithMaxValue(levelCount)}</p>
              </section>
              <section>
                <p className={style.title}>Win %</p>
                <p className={style.stat}>{winPercentage}%</p>
              </section>
              <section>
                <p className={style.title}>Lose %</p>
                <p className={style.stat}>{losePercentage}%</p>
              </section>
            </>
          )}
        
      </div>
    </div>
  );
};

export default StatContainer;