"use client"
import React, { useState } from 'react';
import style from "./Game.module.scss";
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

interface TimeProps{
  startTimer: ()=> void;
  stopTimer: ()=> void;
  time: string;
}

const Game: React.FC<TimeProps> = ({startTimer, stopTimer, time}) => {
  const [startGame, setStartGame] = useState(false);
  const [level, setLevel] = useState<string>('');
  const [winTime, setWinTime] = useState('')

  const handleObstacleEnter = (): void => {
    setStartGame(false);
    setLevel(''); 
    stopTimer()
  };

  return (
    <div className={style.game}>
      {!startGame && level !== "win" && <Start setStartGame={setStartGame} startTimer={startTimer} setLevel={setLevel} />}
      {level === "levelOne" && <LevelOne handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelTwo" && <LevelTwo handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelThree" && <LevelThree handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelFour" && <LevelFour handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelFive" && <LevelFive handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelSix" && <LevelSix handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === 'levelSeven' && <LevelSeven handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelEight" && <LevelEight handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === "levelNine" && <LevelNine handleObstacleEnter={handleObstacleEnter} setLevel={setLevel} />}
      {level === 'levelTen' && <LevelTen handleObstacleEnter={handleObstacleEnter} stopTimer={stopTimer} time={time} setWinTime={setWinTime} setLevel={setLevel} setStartGame={setStartGame} />}
      {level === "win" && <Win setStartGame={setStartGame} setLevel={setLevel} winTime={winTime} startTimer={startTimer} />}
    </div>
  );
};

export default Game;