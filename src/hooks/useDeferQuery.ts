import parser from 'http-string-parser'
import { useEffect, useState } from 'react'

type Props = {
  query: string
}

export const useDeferQuery = ({ query }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>()

  console.log('data', data)

  useEffect(() => {
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
      }),
    }).then((res) => {
      const reader = res.body?.getReader()
      return new ReadableStream({
        start(controller) {
          return pump()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          function pump(): any {
            return reader?.read().then(({ done, value }) => {
              // データを消費する必要がなくなったら、ストリームを閉じます
              if (done) {
                controller.close()
                return
              }
              // uint8arrayを文字列に変換する
              const str = new TextDecoder('utf-8').decode(value)
              // 文字列形式のHTTPレスポンスをパースする
              const resBody = parser.parseResponse(str).body
              // bodyが2行の文字列で、1行目にJSON、2行目に区切りの---が付いているので1行目を取り出す
              const body = resBody.split('\n')[0]
              const queryRes = JSON.parse(body)

              if (queryRes.hasNext) {
                setData(queryRes.data)
              } else {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setData((prev: any) => ({ ...prev, ...queryRes.incremental[0].data }))
              }

              return pump()
            })
          }
        },
      })
    })
  }, [query])

  return data
}
