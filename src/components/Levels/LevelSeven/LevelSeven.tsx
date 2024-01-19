'use client'
import React, {useState, useLayoutEffect, useEffect, useRef} from 'react'
import style from "./LevelSeven.module.scss"

interface Props{
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  handleObstacleEnter: () => void
}

const LevelSeven: React.FC<Props> = ({handleObstacleEnter, setLevel}) => {
  
  const handleWin = () => {
    setLevel('levelEight')
  }

  // obstacle animation logic
  const [topDivHeight, setTopDivHeight] = useState(0);
  const [bottomDivHeight, setBottomDivHeight] = useState(0);

  useLayoutEffect(() => {
    const animationDuration = 2000;

    let startTime = performance.now();

    const updateHeights = (timestamp: number) => {
      const elapsed = timestamp - startTime;

      const topHeight = (elapsed / animationDuration) * 250;
      const bottomHeight = (elapsed / animationDuration) * 250;

      setTopDivHeight(topHeight);
      setBottomDivHeight(bottomHeight);

      if (elapsed < animationDuration) {
        // Continue the animation
        requestAnimationFrame(updateHeights);
      }
    };

    // Start the animation
    requestAnimationFrame(updateHeights);

    // Cleanup on component unmount
    return () => {
      startTime = performance.now();
    };
  }, []);

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
  
  return (
    <div className={style.levelSeven}>
      <div className={style.borderWallWidth1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallWidth2} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight1} onMouseEnter={handleObstacleEnter}></div>
      <div className={style.borderWallHeight2} onMouseEnter={handleObstacleEnter}></div>
    
      <div className={style.topDiv} id="moving-div" style={{ height: `${topDivHeight}px` }} onMouseEnter={handleObstacleEnter}/>
      <div className={style.bottomDiv} id="moving-div" style={{ height: `${bottomDivHeight}px` }} onMouseEnter={handleObstacleEnter}/>
    
      <h1 className={style.warning}>Go, go, go!</h1>
      <div className={style.lvlName}>Level 7</div>
      <span className={style.win} onMouseEnter={handleWin}></span>
    </div>
  )
}

export default LevelSeven