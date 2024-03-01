"use client"
import React, { useContext, useState, useEffect, useRef } from 'react'
import style from "./ChangeNameModal.module.scss"
import { ModalContext } from '@/context/modalContext'
import { IoCloseSharp } from "react-icons/io5"
import { auth, db } from "../../../utils/firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, updateDoc, getDoc, setDoc, serverTimestamp} from 'firebase/firestore';
import { updateProfile } from "firebase/auth";

const ChangeNameModal = () => {
  // importing user
  const [user] = useAuthState(auth)

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [inputValue, setInputValue] = useState('');

  // disable button till checked will be truthy
  const [checked, setChecked] = useState(false);

  // massege for errors
  const [error, setError] = useState("");

  // importing context
  const {changeNameActive, setChangeNameActive} = useContext(ModalContext)


  const handleClose = ()=>{
    setChangeNameActive(false)
  }

  // detecting outside click
  const modalRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setChangeNameActive(false)
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setChangeNameActive]);

  // getting the value of the inputs
  const handleNameChange = (e: any)=>{
    setInputValue(e.target.value);
    setDisplayName(e.target.value)
  }

  // confirm of change name
  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission
  
    // Check if the display name meets the requirements
    if (displayName.length < 3) {
      setError("Display Name must have at least 3 letters.");
      return;
    }
    if (displayName.length > 16) {
      setError("Display Name shouldn't be longer than 16 letters.");
      return;
    }
  
    try {
      // Update the display name in Firebase if user is defined
      if (user) {
        // Update profile display name
        await updateProfile(user, { displayName });
  
        // Get user document
        const userRef = doc(db, 'users', user.uid);
        const userSnapshot = await getDoc(userRef);
  
        // Check if the user document exists
        if (userSnapshot.exists()) {
          // Update newNameDate field with server timestamp
          await updateDoc(userRef, {
            newNameDate: serverTimestamp()
          });
        } else {
          // Create user document and set newNameDate field with server timestamp
          await setDoc(userRef, {
            newNameDate: serverTimestamp()
          });
        }
  
        // Close the modal after successful update
        setChangeNameActive(false);
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className={`${style.modalContainer} ${changeNameActive && style.modalContainerActive}`}>
      <div ref={modalRef} className={style.modal}>
        <div className={style.modalClose} onClick={handleClose}><IoCloseSharp /></div>
        
        <div className={style.modalHeader}>
          <h1>Confirm display name change</h1>
        </div>

        <div className={style.modalContent}>
          <form onSubmit={handleConfirm}>
            <p className={style.warning}>
              <strong>Please note:</strong>
              If you changed your display name, you can&apos;t change it again for 2 weeks after you confirm this change.
            </p>

            <p className={style.currentName}><strong>Current Display Name: </strong>{user?.displayName}</p>
            <div className={style.newNickname}>
              <input  
                required 
                placeholder=" " 
                type="text" 
                id="changeDisplayName" 
                value={displayName} 
                onChange={handleNameChange} 
              />
              <label className={`${inputValue.length > 0 ? style.labelFilled : ''}`}>New Display Name</label>
            </div>
            {error && <p className={style.alertMessage}>{error}</p>}
            <ul className={style.rules}>
              <li>Display names must have at least 3 letters.</li>
              <li>Display names shouldn&apos;t be longer than 16 letters.</li>
            </ul>
            <div className={style.checkContainer}>
              <input className={style.checkRule} onClick={()=> setChecked(!checked)} type="checkbox" id="ruleCheck" required></input>
              <p>I understand I can not change my display name again for 2 weeks after this change.</p>
            </div>

            <button 
              className={style.confirmButton} 
              type="submit" 
              disabled={!checked}
              style={!checked ? {backgroundColor: 'rgba(0, 116, 228, 0.5)', color: `rgba(255,255,255, .5)`} : {}}
            >
              Confirm
            </button>
            <button className={style.cancleButton} onClick={handleClose} >Cancle</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default ChangeNameModal