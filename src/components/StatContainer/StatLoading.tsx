import React from 'react'
import style from "./StatLoading.module.scss"

const StatLoading = () => {
  const loadingDivs = Array.from({ length: 8 }, (_, index) => (
    <div
      key={index}
      className={style.loadingContainer}
    >
      <section>
        <p className={style.first}></p>
        <p className={style.second}></p>
      </section>
    </div>
  ));

  return <div className={style.loading}>{loadingDivs}</div>;
}

export default StatLoading