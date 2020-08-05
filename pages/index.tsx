import { useState } from 'react'
import Head from 'next/head'
import Prefectures from '../components/Prefectures'
import Population from '../components/Population'
import styles from '../styles/Home.module.css'

export default function Home(): JSX.Element {
  const [prefCode, setPrefCode] = useState(1)

  const changePreCode = (code: number) => {
    setPrefCode(code)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Demo RESAS API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Prefectures prefCode={prefCode} changePreCode={changePreCode} />
        <Population prefCode={prefCode} />
      </main>
    </div>
  )
}
