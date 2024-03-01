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
  changeNameActive: boolean
  setChangeNameActive: React.Dispatch<React.SetStateAction<boolean>>
  warningNameActive: boolean
  setWarningNameActive: React.Dispatch<React.SetStateAction<boolean>>
  getNameDate: string | null
  setGetNameDate: React.Dispatch<React.SetStateAction<string | null>>
}

// creating context
export const ModalContext = createContext<ContextType>({
  signInModalActive: false,
  setSignInModalActive: ()=> {},
  signUpModalActive: false,
  setSignUpModalActive: () => {},
  changeNameActive: false,
  setChangeNameActive: ()=> {},
  warningNameActive: false,
  setWarningNameActive: ()=> {},
  getNameDate: null,
  setGetNameDate: ()=> {},
})

export const ModalProvider = ({children}: ContextProviderProps) =>{
  const [signInModalActive, setSignInModalActive] = useState(false)
  const [signUpModalActive, setSignUpModalActive] = useState(false)
  const [changeNameActive, setChangeNameActive] = useState(false)

  // warning for the new name and the date
  const [warningNameActive, setWarningNameActive] = useState(false)
  const [getNameDate, setGetNameDate] = useState<string | null>(null)

  return (
    <ModalContext.Provider
      value={{
        signInModalActive,
        setSignInModalActive,
        signUpModalActive,
        setSignUpModalActive,
        changeNameActive,
        setChangeNameActive,
        warningNameActive, 
        setWarningNameActive,
        getNameDate, 
        setGetNameDate,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}