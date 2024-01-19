"use client"
import React, { useContext } from 'react'
import style from "./Signin.module.scss"
import { ModalContext } from '@/context/modalContext'

const SigninButton = () => {
  const {setSignInModalActive} = useContext(ModalContext)

  const handleSignInActive = () =>{
    setSignInModalActive(true)
  }

  return (
    <div className={style.signin}>
      <div className={style.signinButton} onClick={handleSignInActive}>Login</div>
    </div>
  )
}

export default SigninButton