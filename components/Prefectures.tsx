import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'

export default function Prefectures(): JSX.Element {
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
              <input type="checkbox" value="prefCode" /> {prefName}
            </label>
          </li>
        )
      })}
    </ul>
  )
}
