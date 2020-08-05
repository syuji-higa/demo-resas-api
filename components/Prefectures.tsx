import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'

type Props = {
  prefCode: number
  changePreCode(code: number): void
}

export default function Prefectures({
  prefCode: currentPrefCode,
  changePreCode,
}: Props): JSX.Element {
  const { data, error } = useSWR(
    `https://opendata.resas-portal.go.jp/api/v1/prefectures`,
    fetcher
  )

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
                value="prefCode"
                checked={currentPrefCode === prefCode}
                onChange={() => changePreCode(prefCode)}
              />{' '}
              {prefName}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
