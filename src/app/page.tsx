"use client"
import { useEffect } from 'react'
import styles from './page.module.scss'
import GameContent from '@/components/GameContent/GameContent'
import {metadata} from "./metaData"

export default function Home() {

  // changing metadata
  useEffect(() => {
    if (metadata.title) {
      document.title = String(metadata.title)
    }
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <GameContent />
      </div>
      <div className={styles.warning}>
        <h1>Warning !!!</h1>
        <p>
          We&apos;re sorry, but this game is only playable on PC. 
          Please switch to a device with a larger screen to enjoy the full gaming experience.
        </p>
      </div>
      <p className={styles.copyright}>Copyright © 2024 Giorgi Machitadze All Rights Reserved.</p>
    </main>
  )
}
