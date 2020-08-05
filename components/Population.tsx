import { useState, useEffect } from 'react'
import { fetcher } from '../utils/fetcher'
import { stringify } from 'query-string'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { PrefecturesItem } from '../pages/index'

type Props = {
  prefecturesList: PrefecturesItem[]
  prefCodeList: number[]
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

type PopulationItem = {
  prefCode: number
  data: PopulationData[]
}

async function fetchPopulation(prefCode): Promise<PopulationData[]> {
  const req: PopulationRequest = {
    prefCode,
    cityCode: '-',
  }
  const query = stringify(req)
  const data = await fetcher<PopulationResponse>(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?${query}`
  )
  return data.result.data[0].data
}

function getNotFetchedPrefCodeList(
  populationList: PopulationItem[],
  prefCodeList: number[]
): number[] {
  const notAddedList = []
  for (const code of prefCodeList) {
    const hasCode = populationList.find(({ prefCode }) => prefCode === code)
    if (!hasCode) {
      notAddedList.push(code)
    }
  }
  return notAddedList
}

export default function Population({
  prefecturesList,
  prefCodeList,
}: Props): JSX.Element {
  const [populationList, setPopulationList] = useState<PopulationItem[]>([])

  useEffect(() => {
    // NOTE: 未フェッチの都道府県の人口構成のデータを取得してフェッチする
    const notFetchedPrefCodeList = getNotFetchedPrefCodeList(
      populationList,
      prefCodeList
    )
    for (const prefCode of notFetchedPrefCodeList) {
      ;(async () => {
        const data = await fetchPopulation(prefCode)
        if (!data) {
          alert('failed to load.')
          return
        }
        setPopulationList([...populationList, { prefCode, data }])
      })()
    }
  })

  const populationShownList = populationList.filter(({ prefCode }) =>
    prefCodeList.includes(prefCode)
  )

  const options: Highcharts.Options = {
    title: {
      text: '都道府県別の人口推移',
    },
    yAxis: {
      title: {
        text: '人口',
      },
    },
    xAxis: {
      title: {
        text: '年',
      },
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointInterval: 5,
        pointStart: 1960,
      },
    },
    series: populationShownList.map(({ prefCode, data }) => {
      const name = prefecturesList.find((pref) => pref.prefCode === prefCode)
        .prefName
      return {
        type: 'line',
        name,
        data: data.map(({ value }) => value),
      }
    }),
  }

  return <HighchartsReact highcharts={Highcharts} options={options} />
}
