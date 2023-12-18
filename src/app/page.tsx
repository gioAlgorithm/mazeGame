import Game from '@/components/Game/Game'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <Game />
    </main>
  )
}
