"use client"
import React from 'react'
import style from "./profileLoading.module.scss"
import { IoMdArrowDropdown } from "react-icons/io";

const ProfileLoading = () => {
  return (
    <div className={style.profileLoading}>
      <span></span>
      <IoMdArrowDropdown />
    </div>
  )
}

export default ProfileLoading