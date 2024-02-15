import React from 'react'
import style from "./SignInSuggest.module.scss"
import SigninButton from '../SigninButton/Signin'
import SignUpButton from '../SignUpButton/SignUp'

const SignInSuggest = () => {
  return (
    <div className={style.suggest}>
      <p>
        Sign in now to save your progress, access your profile, 
        and view your stats. Don&apos;t miss out on the full experience!
      </p>
      <div className={style.container}>
        <SigninButton />
        <span>Or</span>
        <SignUpButton />
      </div>
    </div>
  )
}

export default SignInSuggest