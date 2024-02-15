"use client"
import React from 'react'
import style from "./HistoryContainer.module.scss"
// icons
import { FaKeyboard } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import HistoryLoading from './HistoryLoading';
import NoData from '../noData/NoData';
import { GameHistory } from '@/context/UserContext';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext' ,'greek', 'latin-ext']
})

interface Props{
  gameHistory: GameHistory[];
  loadingSkeleton: boolean;
}

const HistoryContainer: React.FC<Props>  = ({gameHistory, loadingSkeleton}) => {
  // calculate date and format it 
  const getTimeAgoString = (timestamp: Date): string => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
  
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
  
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
  
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  };

  // format level names
  const formatLevelName = (level: string): string => {
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

    const numberMatch = level.match(/one|two|three|four|five|six|seven|eight|nine|ten/i);

    if (numberMatch) {
      const spelledOutNumber = numberMatch[0].toLowerCase();
      const numericValue = numberMap[spelledOutNumber];
      return `Level ${numericValue}`;
    }

    return level; // Return the original level name if no match is found
  };

  return (
    <div className={style.history}>
      <div className={style.historyHeader}>
        <h1 className={roboto.className}>History</h1>
        <FaHistory />
      </div>
      <div className={style.historyContent}>
        {/* fetching history of the player */}
        {loadingSkeleton ? (
          <HistoryLoading />
        ) : gameHistory.length > 0 ? (
          gameHistory.map((game, index) => (
            <div
              key={game.id}
              className={style.historyItem}
              style={{background: index % 2 === 0 ? 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(255,255,255,0.1))' : 'none',}}
            >
              <section className={style.firstSection}>
                <p className={style.sectionTitle}>{getTimeAgoString(game.timestamp.toDate())}</p>
                <p className={style.winOrLost} style={game.WinOrLost === "Lost" ? {color: "red"} : {color: 'rgb(13, 201, 13)'}}><FaKeyboard /> {game.WinOrLost}</p>
              </section>
              <section className={style.middleSection}>
                <p className={style.sectionTitle}>Time</p>
                <p className={style.time}>{game.timeSpent}</p>
              </section>
              <section className={style.lastSection}>
                <p className={style.sectionTitle}>Level</p>
                <p className={style.levelName}>{formatLevelName(game.levelLost)}</p>
              </section>
              
            </div>
          ))
        ) : (
          <NoData />
        )}
        
      </div>
    </div>
  )
}

export default HistoryContainer