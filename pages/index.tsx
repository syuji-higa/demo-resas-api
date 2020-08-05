import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import Head from 'next/head'
import Prefectures from '../components/Prefectures'
import Population from '../components/Population'
import styles from '../styles/Home.module.css'

export type PrefecturesItem = {
  prefCode: number
  prefName: string
}

export type PrefecturesResponse = {
  message: string
  result: PrefecturesItem[]
}

export default function Home(): JSX.Element {
  const [prefCodeList, setPrefCodeList] = useState([13]) // 初期値：東京

  const updatePreCodeList = (prefCodeList: number[]) => {
    setPrefCodeList(prefCodeList)
  }

  const prefecturesSWR = useSWR<PrefecturesResponse>(
    `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
    fetcher
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Demo RESAS API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.prefectures}>
          <Prefectures
            prefecturesSWR={prefecturesSWR}
            prefCodeList={prefCodeList}
            updatePreCodeList={updatePreCodeList}
          />
        </div>
        <div className={styles.population}>
          <Population
            prefecturesList={prefecturesSWR.data?.result}
            prefCodeList={prefCodeList}
          />
        </div>
      </main>
    </div>
  )
}
