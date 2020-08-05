import { responseInterface } from 'swr'
import { PrefecturesResponse } from '../pages/index'

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
    <ul>
      {data.result.map(({ prefCode, prefName }) => {
        return (
          <li key={prefCode}>
            <label>
              <input
                type="checkbox"
                value={prefCode}
                onChange={(e) => onChange(prefCode, e.target.checked)}
              />
              {prefName}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
