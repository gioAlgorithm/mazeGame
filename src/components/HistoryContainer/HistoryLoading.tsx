import React from 'react';
import style from "./HistoryLoading.module.scss";

const HistoryLoading = () => {
  const loadingDivs = Array.from({ length: 7 }, (_, index) => (
    <div
      key={index}
      className={style.loadingContainer}
      style={{
        background: index % 2 === 0 ? 'linear-gradient(to right, rgba(255,255,255,0.02), rgba(255,255,255,0.1))' : 'none',
      }}
    >
      <section className={style.firstSection}>
        <p className={style.first}></p>
        <p className={style.second}></p>
      </section>
      <section className={style.middleSection}>
        <p className={style.first}></p>
        <p className={style.second}></p>
      </section>
      <section className={style.lastSection}>
        <p className={style.first}></p>
        <p className={style.second}></p>
      </section>
    </div>
  ));

  return <div className={style.loading}>{loadingDivs}</div>;
}

export default HistoryLoading;