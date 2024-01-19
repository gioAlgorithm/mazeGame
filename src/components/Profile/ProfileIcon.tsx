import React from 'react'
import style from "./Profile.module.scss"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"

interface Props{
  width: string;
  height: string;
}

const ProfileIcon: React.FC<Props> = ({width, height}) => {
  const [user, loading] = useAuthState(auth)

  return (
    <div className={style.profileIcon} style={{width: `${width}px`, height: `${height}px`}}>
      <h1>{user?.displayName?.charAt(0).toUpperCase()}</h1>
    </div>
  )
}

export default ProfileIcon