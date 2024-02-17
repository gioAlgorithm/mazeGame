"use client"
import React, { useState, useRef } from 'react';
import style from "./Game.module.scss";
import { collection, addDoc, serverTimestamp, increment, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import { auth, db } from "../../utils/firebase"; // Update this path

// importing levels and other components for the game
import Start from '../Start/Start';
import LevelOne from '../Levels/LevelOne/LevelOne';
import LevelTwo from '../Levels/LevelTwo/LevelTwo';
import LevelThree from '../Levels/LevelThree/LevelThree';
import LevelFour from '../Levels/LevelFour/LevelFour';
import LevelFive from '../Levels/LevelFive/LevelFive';
import LevelSix from '../Levels/LevelSix/LevelSix';
import LevelSeven from '../Levels/LevelSeven/LevelSeven';
import LevelEight from '../Levels/LevelEight/LevelEight';
import LevelNine from '../Levels/LevelNine/LevelNine';
import LevelTen from '../Levels/LevelTen/LevelTen';
import Win from '../Win/Win';
import TryAgain from '../TryAgain/TryAgain';

interface TimeProps{
  startTimer: ()=> void;
  stopTimer: ()=> void;
  time: string;
  winTime: string;
  setWinTime: React.Dispatch<React.SetStateAction<string>>
  newRecord: boolean;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>
}

const Game: React.FC<TimeProps> = ({startTimer, stopTimer, time, winTime, setWinTime, newRecord, setNewRecord}) => {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState<string>('startGame');
  const [tryAgain, setTryAgain] = useState(false)
  const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
  const mouseMoveThreshold = 70; // Threshold for mouse movement detection

  const gameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = event;
    const { x: prevX, y: prevY } = prevMousePosition;
    const dx = Math.abs(clientX - prevX);
    const dy = Math.abs(clientY - prevY);

    // Check if mouse movement exceeds threshold
    if ((dx > mouseMoveThreshold || dy > mouseMoveThreshold) && startGame) {
      handleObstacleEnter();
      console.log('cheated')
    }
    
    setPrevMousePosition({ x: clientX, y: clientY });
  };

  const handleObstacleEnter = async (): Promise<void> => {
    setLevel('');
    stopTimer();
    setTryAgain(true);
    setStartGame(false)
  
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
  
      // Create a reference to the user's stats document
      const userStatsDoc = doc(db, `users/${userId}/stats/stats`);
  
      // Get the current stats snapshot
      const statsSnapshot = await getDoc(userStatsDoc);
  
      if (statsSnapshot.exists()) {
        const currentTotalGames = statsSnapshot.data()?.totalGames || 0;
        const currentTotalTimeInSeconds = statsSnapshot.data()?.totalTime || 0;
  
        // Convert the time strings into seconds for comparison
        const [minutes, seconds] = time.split(':').map(part => parseInt(part, 10));
        const currentTimeInSeconds = minutes * 60 + seconds;
  
        await updateDoc(userStatsDoc, {
          totalGames: currentTotalGames + 1,
          totalTime: currentTotalTimeInSeconds + currentTimeInSeconds,
          [level]: increment(1), // Increment the specific level count
        });
      } else {
        // If the stats document doesn't exist, create it with initial values
        const currentTimeInSeconds = time
          .split(':')
          .map((part) => parseInt(part, 10))
          .reduce((total, part, index) => total + part * Math.pow(1, 2 - index), 0);
  
        await setDoc(userStatsDoc, {
          totalGames: 1,
          totalTime: currentTimeInSeconds,
          [level]: 1, // Set the specific level count to 1
        });
      }
      
      // Add a new document to the user's "history" collection for the lost game
      const userHistoryCollection = collection(db, `users/${userId}/history`);
      await addDoc(userHistoryCollection, {
        timeSpent: time,
        levelLost: level,
        timestamp: serverTimestamp(),
        WinOrLost: 'Lost',
      });
    } else {
      console.error('No authenticated user found. Unable to store lost game information.');
    }
  };

  return (
    <div className={style.game} onContextMenu={(e) => e.preventDefault()} onMouseMove={handleMouseMove} ref={gameRef}>
      {!startGame && level !== "win" && !tryAgain && level === "startGame" && <Start setStartGame={setStartGame} startTimer={startTimer} setLevel={setLevel} setNewRecord={setNewRecord} />}
      {tryAgain && !startGame && <TryAgain startTimer={startTimer} setLevel={setLevel} setTryAgain={setTryAgain} setNewRecord={setNewRecord} setStartGame={setStartGame} />}
      {level === "levelOne" && <LevelOne handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelTwo" && <LevelTwo handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelThree" && <LevelThree handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelFour" && <LevelFour handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelFive" && <LevelFive handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelSix" && <LevelSix handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === 'levelSeven' && <LevelSeven handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelEight" && <LevelEight handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelNine" && <LevelNine handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === 'levelTen' && <LevelTen handleObstacleEnter={handleObstacleEnter} stopTimer={stopTimer} time={time} setWinTime={setWinTime} setLevel={setLevel} setStartGame={setStartGame}/>}
      {level === "win" && <Win setStartGame={setStartGame} setLevel={setLevel} winTime={winTime} startTimer={startTimer} newRecord={newRecord} setNewRecord={setNewRecord} />}
    </div>
  );
};

export default Game;