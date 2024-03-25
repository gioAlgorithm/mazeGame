import React from 'react'
import style from "./PlayerSuggest.module.scss"
import SignUpButton from '@/components/SignUpButton/SignUp'
import SigninButton from '@/components/SigninButton/Signin'

const PlayerSuggest = () => {
  return (
    <div className={style.main}>
      <p>
        Join us now to save your progress, unlock your profile,
        and track your stats. Don&apos;t miss out on the complete experience! Sign in or Sign up today!
      </p>

      <div className={style.loginContainer}>
        <SigninButton />
        <div className={style.or}>
          <span></span>
          <p>or</p>
        </div>
        <SignUpButton />
      </div>
    </div>
  )
}

export default PlayerSuggest