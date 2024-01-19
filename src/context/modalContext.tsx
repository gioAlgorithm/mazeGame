"use client"
import React, {createContext, useState} from "react"

//interface for contextprovider which is going to be only child
interface ContextProviderProps{
  children: React.ReactNode
}

// interface for context
interface ContextType{
  signInModalActive: boolean
  setSignInModalActive: React.Dispatch<React.SetStateAction<boolean>>
  signUpModalActive: boolean
  setSignUpModalActive: React.Dispatch<React.SetStateAction<boolean>>
}

// creating context
export const ModalContext = createContext<ContextType>({
  signInModalActive: false,
  setSignInModalActive: ()=> {},
  signUpModalActive: false,
  setSignUpModalActive: () => {},
})

export const ModalProvider = ({children}: ContextProviderProps) =>{
  const [signInModalActive, setSignInModalActive] = useState(false)
  const [signUpModalActive, setSignUpModalActive] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        signInModalActive,
        setSignInModalActive,
        signUpModalActive,
        setSignUpModalActive,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}