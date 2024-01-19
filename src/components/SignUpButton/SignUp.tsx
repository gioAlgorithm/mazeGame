"use client"
import React, {useContext} from 'react'
import style from "./SignUp.module.scss"
import { ModalContext } from '@/context/modalContext'

const SignUpButton = () => {
  const {setSignUpModalActive} = useContext(ModalContext)

  const handleSignUpActive = () =>{
    setSignUpModalActive(true)
  }

  return (
    <div className={style.signUp}>
      <div className={style.signUpButton} onClick={handleSignUpActive}>Sign Up</div>
    </div>
  )
}

export default SignUpButton