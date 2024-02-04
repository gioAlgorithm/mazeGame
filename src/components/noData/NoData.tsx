import React from 'react'
import style from "./NoData.module.scss"

const NoData = () => {
  return (
    <div className={style['wrapper']}>
      <div className={style[`gears`]}>
      
        <div className={style[`gear-container`]}>
          <div className={style["gear-rotate"]}></div>
          <div className={style["gear-rotate-left"]}></div>
        </div>
      </div>
      <h1>No Data</h1>
    </div>
  )
}

export default NoData