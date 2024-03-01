"use client"
import React,{useContext, useEffect, useRef, useState} from 'react'
import style from "./SignUpModal.module.scss"
import { ModalContext } from '@/context/modalContext'
import { IoCloseSharp } from "react-icons/io5"
import { auth } from "../../../utils/firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Password from '@/components/Password/Password'

const SignUpModal = () => {

  // importing user
  const [user] = useAuthState(auth)

  // state for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [inputValue, setInputValue] = useState('');
  // massege for errors
  const [error, setError] = useState("");

  // importing context to close the modal
  const {signUpModalActive, setSignUpModalActive, setSignInModalActive} = useContext(ModalContext)

  const handleClose = ()=>{
    setSignUpModalActive(false)
  }

  const handleSignInActive = ()=>{
    setSignUpModalActive(false)
    setSignInModalActive(true)
  }

  // detecting outside click
  const modalRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSignUpModalActive(false)
        
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setSignUpModalActive]);

  // whenever there will be user the modal will disappear
  useEffect(() => {
    // Update modal state based on user
    if (user) {
      setSignUpModalActive(false);
    }
  }, [user, setSignUpModalActive]);

  // handling sign up
  const handleSignUp = async (e:React.FormEvent) => {
    e.preventDefault();

    // Check if the password meets the minimum length requirement
    if (password.length < 6) {
      setError("Password should be more than 6 characters");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName });
      console.log(user);
    } catch (error: any) {
      const errorCode = error.code;
      console.log(error);
      if (errorCode === "auth/email-already-in-use") {
        setError("User already exists");
      }
    }
  };

  const handleNameChange = (e: any)=>{
    setInputValue(e.target.value);
    setDisplayName(e.target.value)
  }

  const handleEmailChange = (e: any) =>{
    setInputValue(e.target.value);
    setEmail(e.target.value)
    setError("");
  }


  return (
    <div  className={`${style.signUpModalContainer} ${signUpModalActive && style.signUpModalContainerActive}`}>
      <div ref={modalRef} className={style.signUpModal} >
        <div className={style.modalClose} onClick={handleClose}><IoCloseSharp /></div>
        <div className={style.modalHeader}>
          <h1>Sign Up</h1>
        </div>
        <div className={style.modalContent}>
        {/* form for register */}
          <form onSubmit={handleSignUp}>
            <div className={style.registerNickname}>
              <input  
                required 
                placeholder=" " 
                type="text" 
                id="displayName" 
                value={displayName} 
                onChange={handleNameChange} 
              />
              <label className={`${inputValue.length > 0 ? style.labelFilled : ''}`} >Nickname</label>
            </div>

            <div className={style.signUpEmail}>
              <input 
                required 
                placeholder=" " 
                type="email" 
                id="signUpEmail" 
                value={email} 
                onChange={handleEmailChange} 
                style={{ boxShadow: error ? 'rgb(227, 63, 92) 0px 1px 2px, rgb(227, 63, 92) 0px 0px 0px 2px' : 'black' }}
              />
              <label className={`${inputValue.length > 0 ? style.labelFilled : ''}`} style={{color: error ? 'rgb(227, 63, 92)' : 'black'}}>Email</label>
            </div>
            
            <Password id={'signUpPassword'} setPassword={setPassword} password ={password} error={error} setError={setError} />

            <button className={style.signUpBtn} type="submit">Sign Up</button>
          </form>
          {error &&
            <p className={style.alertMessage}>{error}</p>
          }
          <p className={style.signInTitle}>Already have an account? <span className={style.signUpButton} onClick={handleSignInActive}> Login </span> here!</p>
        </div>
      </div>
    </div>
  )
}

export default SignUpModal