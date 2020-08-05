import { responseInterface } from 'swr'
import { PrefecturesResponse } from '../pages/index'
import styles from '../styles/Prefectures.module.css'

type Props = {
  prefecturesSWR: responseInterface<PrefecturesResponse, any>
  prefCodeList: number[]
  updatePreCodeList(code: number[]): void
}

export default function Prefectures({
  prefecturesSWR,
  prefCodeList,
  updatePreCodeList,
}: Props): JSX.Element {
  const onChange = (code: number, checked: boolean) => {
    const codeSet = new Set(prefCodeList)
    if (checked) {
      codeSet.add(code)
    } else {
      codeSet.delete(code)
    }
    updatePreCodeList(Array.from(codeSet))
  }

  const { data, error } = prefecturesSWR

  if (!error && !data) return <div>loading...</div>
  if (error || !data.result) return <div>failed to load.</div>
  return (
    <ul className={styles.list}>
      {data.result.map(({ prefCode, prefName }) => {
        return (
          <li key={prefCode} className={styles.listItem}>
            <label className={styles.label}>
              <input
                type="checkbox"
                value={prefCode}
                onChange={(e) => onChange(prefCode, e.target.checked)}
                checked={prefCodeList.includes(prefCode)}
                className={styles.checkbox}
              />
              {prefName}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
