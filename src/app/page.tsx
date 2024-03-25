"use client"
import { useEffect } from 'react'
import styles from './page.module.scss'
import GameContent from '@/components/GameContent/GameContent'
import {metadata} from "./metaData"
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin', 'cyrillic', 'cyrillic-ext' ,'greek', 'latin-ext']
})

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
        <h1 className={roboto.className}>Warning !!!</h1>
        <p className={roboto.className}>
          We&apos;re sorry, but this game is only playable on PC. 
          Please switch to a device with a larger screen to enjoy the full gaming experience.
        </p>
      </div>
      <p className={styles.copyright}>Copyright © 2024 Giorgi Machitadze All Rights Reserved.</p>
    </main>
  )
}
