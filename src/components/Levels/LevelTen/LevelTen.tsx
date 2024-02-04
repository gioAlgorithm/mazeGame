'use client'
import React, { useState, useRef, useEffect } from 'react'
import style from "./LevelTen.module.scss"
import {collection, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc} from "firebase/firestore"
import { auth, db } from "../../../utils/firebase"; // Update this path

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  stopTimer: ()=> void;
  setWinTime: React.Dispatch<React.SetStateAction<string>>;
  time: string;
}

const LevelTen: React.FC<Props> = ({handleObstacleEnter, time, setWinTime, stopTimer, setLevel, setStartGame}) => {
  // running div active logic
  const [run, setRun] = useState(false)

  // gate opener
  const [gate, setGate] = useState(false)

  //logic for running div
  const handleRun = ()=>{
    setRun(true)
  }

  //logic to open gate
  const handleGateOpen = ()=>{
    setGate(true)
  }

  // creating refs to detect collision between mouse and moving div
  const xRef = useRef(0);
  const yRef = useRef(0);

  // logic for collision
  const handleMouseCollision = (e: MouseEvent) => {
      xRef.current = e.pageX;
      yRef.current = e.pageY;
  };

  const checkCollision = () => {
      const movingDivs = document.querySelectorAll("#moving-div");

      movingDivs.forEach((movingDiv) => {
      const divReact = movingDiv.getBoundingClientRect();

      const x = xRef.current;
      const y = yRef.current;

      if (x >= divReact.left && x <= divReact.right && y >= divReact.top && y <= divReact.bottom) {
          console.log("Collision with moving div!");
          handleObstacleEnter();
      }
      });
  };

  useEffect(() => {
      document.addEventListener("mousemove", handleMouseCollision);

      const intervalId = setInterval(checkCollision, 20);

      return () => {
      document.removeEventListener("mousemove", handleMouseCollision);
      clearInterval(intervalId);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // win logic
  const handleWin = async () => {
    setLevel('win');
    setStartGame(false);
    stopTimer();
    setWinTime(time);

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
        const currentTotalWins = statsSnapshot.data()?.totalWins || 0;
        const currentBestTime = statsSnapshot.data()?.bestTime || null;

        // Convert the time strings into seconds for comparison
        const currentTimeInSeconds = time
          .split(':')
          .map((part) => parseInt(part, 10))
          .reduce((total, part, index) => total + part * Math.pow(1, 2 - index), 0);

        // Check if there is no previous best time or the current time is less than the previous best time
        if (!currentBestTime || currentTimeInSeconds < currentBestTime) {
          // Update the stats document with the new best time
          await updateDoc(userStatsDoc, {
            totalGames: currentTotalGames + 1,
            totalTime: currentTotalTimeInSeconds + currentTimeInSeconds,
            totalWins: currentTotalWins + 1,
            bestTime: currentTimeInSeconds, // Update the best time
          });
        } else {
          // Update the stats document without changing the best time
          await updateDoc(userStatsDoc, {
            totalGames: currentTotalGames + 1,
            totalTime: currentTotalTimeInSeconds + currentTimeInSeconds,
            totalWins: currentTotalWins + 1,
          });
        }
      } else {
        // If the stats document doesn't exist, create it with initial values
        const currentTimeInSeconds = time
          .split(':')
          .map((part) => parseInt(part, 10))
          .reduce((total, part, index) => total + part * Math.pow(1, 2 - index), 0);

        await setDoc(userStatsDoc, {
          totalGames: 1,
          totalTime: currentTimeInSeconds,
          totalWins: 1,
          bestTime: currentTimeInSeconds, // Set the initial best time
        });
      }

      // Add a new document to the user's "history" collection for the win
      const userHistoryCollection = collection(db, `users/${userId}/history`);
      await addDoc(userHistoryCollection, {
        timeSpent: time,
        levelLost: "levelTen",
        timestamp: serverTimestamp(),
        WinOrLost: 'Win',
      });
    } else {
      console.error('No authenticated user found. Unable to store lost game information.');
    }
  };

  

  return (
    <div className={style.levelTen}>
      
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter}></div>
    
      {/* obstacles  */}
      <div className={style.obstacle1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle3} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle4} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle5} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle6} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle7} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle8} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle9} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle10} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle11} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle12} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle13} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle14} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.obstacle15} onMouseEnter={handleObstacleEnter}></div>

      {/* rhombus */}
      <div className={style.rhombus1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus3} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus4} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus5} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus6} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus7} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus8} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus9} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus10} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus11} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus12} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus13} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus14} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus15} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus16} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus17} onMouseEnter={handleObstacleEnter}></div>

      {/* rhombus on the top */}
      <div className={style.rhombus18} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus19} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus20} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus21} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus22} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus23} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus24} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus25} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus26} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus27} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus28} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus29} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus30} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus31} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus32} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus33} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.rhombus34} onMouseEnter={handleObstacleEnter}></div>

      {/* logic where the cursor will enter the div the running div will move */}
      <div className={`${style.runningDiv} ${run && style.runningDivActive}`} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.runningDivActivator} onMouseEnter={handleRun}></div>


      {/* moving divs */}
      <div className={style.movingDiv1} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv2} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv3} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv4} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv5} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv6} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv7} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      

      {/* moving div from left to right */}
      <div className={style.movingDiv8} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv9} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      
      <div className={style.movingDiv10} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv11} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      
      <div className={style.movingDiv12} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv13} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <div className={style.movingDiv14} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv15} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <div className={style.movingDiv16} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv17} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      {/* gate whenever user hovers the blue square it will move */}
      <div className={style.gateOpener} onMouseEnter={handleGateOpen}></div>
      <div className={`${style.gate} ${gate && style.gateOpen}`} onMouseEnter={handleObstacleEnter}></div>

      <p className={style.gateWarning}>↑ touch the blue square to open the gate</p>

      {/* safer which will protect dot to touch the obstacle */}
      <div className={style.safer1}></div>
      <div className={style.safer2}></div>

      
      <h1 className={style.lvlName} >Level 10</h1>
      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelTen