'use client'
import React, {useState, useRef, useEffect} from 'react'
import style from "./Profile.module.scss"
import Image from 'next/image'
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../../utils/firebase"
import Link from 'next/link'

// react icons
import { IoMdArrowDropdown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePoweroff } from "react-icons/ai";
import ProfileIcon from '../ProfileIcon/ProfileIcon'


const Profile = () => {
  // importing user information
  const [user] = useAuthState(auth)
  const [showMenu, setShowMenu] = useState(false)

  const handleShowMenu = ()=>{
    setShowMenu(!showMenu)
  }

  const menuRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
        
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [setShowMenu]);

  // changing profile background style
  const profileContainerStyle = {
    backgroundColor: showMenu ? 'rgb(74,77,81)' : '',
  };

  return (
    <div className={style.profile}>
      <div className={style.profileContainer} style={profileContainerStyle} onClick={handleShowMenu}>
        {user?.photoURL ? <Image alt='profile' width={40} height={40} src={user?.photoURL} /> : <ProfileIcon width={`40`} height={`40`} fontSize={'1'}/>}
        <IoMdArrowDropdown className={`${style.arrow} ${showMenu && style.activeArrow}`}/>
      </div>
      {showMenu &&
        <div className={style.profileMenu} ref={menuRef}>
          <div className={style.profileName}>
            {user?.photoURL ? <Image alt='profile' width={24} height={24} src={user?.photoURL} /> : <ProfileIcon width={`24`} height={`24`} fontSize={`.65`} /> }
            <span>
              {user?.displayName && user?.displayName}
            </span>
          </div>
          <Link className={style.profileButton} href="/profilePage" onClick={handleShowMenu}><CgProfile /> Profile</Link>
          <div className={style.signOut} onClick={()=> auth.signOut()}><AiOutlinePoweroff /> Sign Out</div>
        </div>
      }
    </div>
  )
}

export default Profile