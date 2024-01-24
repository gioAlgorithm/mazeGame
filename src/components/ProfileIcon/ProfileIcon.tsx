import React from 'react'
import style from "./ProfileIcon.module.scss"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"

interface Props{
  width: string;
  height: string;
  fontSize: string
}

const ProfileIcon: React.FC<Props> = ({width, height, fontSize}) => {
  const [user, loading] = useAuthState(auth)

  return (
    <div className={`${style.profileIcon} ${loading && style.profileIconLoading}`} style={{width: `${width}px`, height: `${height}px`, fontSize: `${fontSize}rem`}}>
      <h1>{user?.displayName?.charAt(0).toUpperCase()}</h1>
    </div>
  )
}

export default ProfileIcon