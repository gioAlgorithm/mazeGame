import React from 'react'
import style from "./leaderboardPage.module.scss"

const LoadingLeaderboard = () => {
  
  const loadingDivs = Array.from({ length: 10 }, (_, index) => (
    <div
      key={index}
      className={style.leaderboardLoading}
      style={{
        background: index % 2 === 0 ? 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(255,255,255,0.1))' : 'none',
      }}
    >
      <div className={style.first}>
        <span></span>
      </div>
      <div className={style.second}>
        <span className={style.left}></span>
        <span className={style.right}></span>
      </div>
      <div className={style.third}>
        <span></span>
      </div>
      <div className={style.fourth}>
        <span></span>
      </div>
    </div>
  ));

  return <div className={style.loading}>{loadingDivs}</div>;
}

export default LoadingLeaderboard