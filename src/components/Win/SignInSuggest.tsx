import React from 'react'
import style from "./SignInSuggest.module.scss"
import SigninButton from '../SigninButton/Signin'
import SignUpButton from '../SignUpButton/SignUp'

const SignInSuggest = () => {
  return (
    <div className={style.suggest}>
      <p>
        Join us now to save your progress, unlock your profile,
        and track your stats. Don&apos;t miss out on the complete experience! Sign in or Sign up today!
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