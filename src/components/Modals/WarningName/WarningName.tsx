'use client'
import React, { useContext, useRef, useEffect } from 'react'
import style from "./WarningName.module.scss"
import { ModalContext } from '@/context/modalContext'
import { IoCloseSharp } from "react-icons/io5"

const WarningName = () => {

  // importing context
  const {warningNameActive, setWarningNameActive, getNameDate} = useContext(ModalContext)

  // close the modal
  const handleClose = ()=>{
    setWarningNameActive(false)
  }

  // detecting outside click
  const modalRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setWarningNameActive(false)
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setWarningNameActive]);

  // calculate the date, which is going to be two week later of the newNameDate
  let twoWeeksLaterDate = '';

  if (getNameDate) {
    twoWeeksLaterDate = calculateTwoWeeksLater(getNameDate);
  } else {
    twoWeeksLaterDate = 'Not available';
  }

  function calculateTwoWeeksLater(dateString: string): string {
    const twoWeeksLater = new Date(dateString);
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

    return twoWeeksLater.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    });
  }

  return (
    <div className={`${style.modalContainer} ${warningNameActive && style.modalContainerActive}`}>
      <div ref={modalRef} className={style.modal}>
        <div className={style.modalClose} onClick={handleClose}><IoCloseSharp /></div>
      
        <div className={style.modalHeader}>
          <h1>You Recently Changed Your Name</h1>
        </div>

        <div className={style.modalContent}>
          <p>You recently changed your display name. According to our policy, you cannot change your display name again until the specified time has passed.</p>
          <h2>Date of Name Change:</h2>
          <h1>{`${getNameDate}`}</h1>
          <h2>Date When Name Change is Permitted Again:</h2>
          <h1>{twoWeeksLaterDate}</h1>
        </div>
      </div>
    </div>
    
  )
}

export default WarningName