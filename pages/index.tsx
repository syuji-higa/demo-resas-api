import Head from 'next/head'
import Prefectures from '../components/Prefectures'
import styles from '../styles/Home.module.css'

export default function Home(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo RESAS API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Prefectures />
      </main>
    </div>
  )
}
