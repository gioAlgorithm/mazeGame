import React from 'react'
import style from "./PlayerPosition.module.scss"

const PlayerPositionLoading = () => {
  return (
    <div className={style.playerPositionLoading}>
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
  )
}

export default PlayerPositionLoading