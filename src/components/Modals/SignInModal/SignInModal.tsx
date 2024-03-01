"use client"
import React,{useContext, useEffect, useRef} from 'react'
import style from "./SignInModal.module.scss"
import { ModalContext } from '@/context/modalContext'
import { IoCloseSharp } from "react-icons/io5"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import {auth} from "../../../utils/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { FaGithub } from "react-icons/fa";
import SignInWithEmail from './SignInWithEmail'

const SignInModal = () => {

  // importing user to manipulate modal
  const [user] = useAuthState(auth) 

  // modal showing up context
  const {signInModalActive, setSignInModalActive, setSignUpModalActive} = useContext(ModalContext)

  const handleClose = ()=>{
    setSignInModalActive(false)
  }

  const handleSignUpActive = ()=>{
    setSignInModalActive(false)
    setSignUpModalActive(true)
  }

  // detecting outside click
  const modalRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSignInModalActive(false)
        
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setSignInModalActive]);

  // whenever there will be user the modal will disappear
  useEffect(() => {
    // Update modal state based on user
    if (user) {
      setSignInModalActive(false);
    }
  }, [user, setSignInModalActive]);

  // sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  // sign in with Github
  const githubProvider = new GithubAuthProvider();
  const GithubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log(result.user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div  className={`${style.signInModalContainer} ${signInModalActive && style.signInModalContainerActive}`}>
      <div ref={modalRef} className={style.signInModal} >
        <div className={style.modalClose} onClick={handleClose}><IoCloseSharp /></div>
        <div className={style.modalHeader}>
          <h1>Login</h1>
        </div>
        <div className={style.modalContent}>
          <SignInWithEmail />

          <div className={style.or}><p>or</p></div>

          <button onClick={GoogleLogin} className={style.googleLogin}>
            <FcGoogle />
            <span> Continue with Google</span>
          </button>

          <button onClick={GithubLogin} className={style.githubLogin}>
            <FaGithub />
            <span> Continue with Github</span>
          </button>

          <p className={style.signUpTitle}>New here? <span className={style.signUpButton} onClick={handleSignUpActive}> Sign up now</span></p>
          
        </div>
      </div>
    </div>
  )
}

export default SignInModal