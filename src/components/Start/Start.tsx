"use client"
import React from 'react';
import style from "./Start.module.scss";
import { Black_Ops_One } from 'next/font/google';
import { Russo_One } from 'next/font/google';

const blackOps = Black_Ops_One({
  weight: ["400"],
  subsets: ['latin']
})

const russoOne = Russo_One({
  weight: ['400'],
  subsets:['latin']
})


interface Props {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  startTimer: () => void;
  setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
}

const Start: React.FC<Props> = ({ setStartGame, setLevel, startTimer, setNewRecord }) => {
  const handleStart = () => {
    // Start the game
    setStartGame(true);
    setLevel("levelOne");
    startTimer();
    setNewRecord(false);
  };

  return (
    <div className={style.startContainer}>
      <div className={style.innerStart}>
        <h1 className={blackOps.className}>THE MAZE</h1>
        <span className={style.guide}><p className={russoOne.className}>Guide the red point through the maze, but don&apos;t touch the walls!</p></span>
        <button onClick={handleStart}>Play</button>
      </div>
    </div>
  );
};

export default Start;