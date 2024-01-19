'use client'
import React, {useRef, useEffect} from 'react'
import style from "./LevelNine.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelNine: React.FC<Props> = ({handleObstacleEnter, setLevel}) => {
  
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

  // winning logic
  const handleWin = ()=>{
    setLevel('levelTen')
  }
  
  return (
    <div className={style.levelNine}>
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter}></div>
    
      <div className={style.movingDiv1} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv2} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      
      <div className={style.movingDiv3} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv4} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      
      <div className={style.movingDiv5} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv6} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <div className={style.movingDiv7} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv8} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <div className={style.movingDiv9} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv10} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <div className={style.movingDiv11} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv12} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      
      <div className={style.movingDiv13} id="moving-div" onMouseEnter={handleObstacleEnter}></div>
      <div className={style.movingDiv14} id="moving-div" onMouseEnter={handleObstacleEnter}></div>

      <h1 className={style.lvlName}>
        <span className={style.lvlNameSpan}>L</span>
        <span className={style.lvlNameSpan}>e</span>
        <span className={style.lvlNameSpan}>v</span>
        <span className={style.lvlNameSpan}>e</span>
        <span className={style.lvlNameSpan}>l</span>
        <span className={style.lvlNameSpan}>9</span>
      </h1>
      
      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelNine