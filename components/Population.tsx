import useSWR from 'swr'
import { fetcher } from '../utils/fetcher'
import { stringify } from 'query-string'

type Props = {
  prefCode: number
}

type PopulationRequest = {
  prefCode: number
  cityCode: string
  addArea?: any
}

type PopulationData = {
  year: number
  value: number
}

type PopulationDataGroup = {
  data: PopulationData[]
  label: string
}

type PopulationResponse = {
  result: {
    boundaryYear: number
    data: PopulationDataGroup[]
  }
}

export default function Population({ prefCode }: Props): JSX.Element {
  const req: PopulationRequest = {
    prefCode: prefCode,
    cityCode: '-',
  }
  const query = stringify(req)

  const { data, error } = useSWR<PopulationResponse>(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query}
    `,
    fetcher
  )

  if (!error && !data) return <div>loading...</div>
  if (error || !data.result) return <div>failed to load.</div>
  return (
    <ul>
      {data.result.data[0].data.map(({ year, value }) => {
        return (
          <li key={year}>
            {year}:{value}
          </li>
        )
      })}
    </ul>
  )
}
