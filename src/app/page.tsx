import styles from './page.module.scss'
import GameContent from '@/components/GameContent/GameContent'

export default function Home() {
  // timer logic
  

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <GameContent />
      </div>
      
    </main>
  )
}
