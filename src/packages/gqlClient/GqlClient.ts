import {
  DocumentNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  OperationDefinitionNode,
} from 'graphql'
import parser from 'http-string-parser'

export type Value = Record<string, unknown>
type CacheValue = Promise<Value> | undefined

type Props = {
  url: string
  cachePolicy?: RequestCache
}

export class GqlClient {
  url: string
  cachePolicy?: RequestCache
  cache = new Map<string, CacheValue>()
  subscribers = new Set<() => void>()

  constructor({ url, cachePolicy }: Props) {
    this.url = url
    this.cachePolicy = cachePolicy
  }

  private readCache(key: string) {
    return this.cache.get(key)
  }

  readFragment(fragment: DocumentNode) {
    const name = fragment.definitions.find(
      (def): def is FragmentDefinitionNode => def.kind === 'FragmentDefinition',
    )?.name.value
    if (!name) return undefined
    return this.readCache(name)
  }

  setCache(key: string, value: CacheValue) {
    this.cache.set(key, value)
    this.subscribers.forEach((notify) => notify())
  }

  async deferQuery(query: DocumentNode) {
    const resolves = new Map<string, (data: Value) => void>()

    query.definitions
      .find(
        (def): def is OperationDefinitionNode =>
          def.kind === 'OperationDefinition' && def.operation === 'query',
      )
      ?.selectionSet.selections.filter(
        (sel): sel is FragmentSpreadNode => sel.kind === 'FragmentSpread',
      )
      .forEach((sel) => {
        const name = sel.name.value
        // 各フラグメントのpromiseをcacheにセットする
        // ストリームで値が届いたタイミングでresolveしたいので、resolveは外から呼び出せるようにしている
        this.setCache(name, new Promise((resolve) => resolves.set(name, resolve)))
      })

    fetch(this.url, {
      method: 'POST',
      mode: 'cors',
      cache: this.cachePolicy,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query.loc?.source.body }),
    }).then(({ body }) => {
      const reader = body?.getReader()
      return new ReadableStream({
        start(controller) {
          return pump()
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          function pump(): any {
            return reader?.read().then(({ done, value }) => {
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
              const data = queryRes.incremental ? queryRes.incremental[0].data : queryRes.data

              if (queryRes.incremental) {
                //   eslint-disable-next-line @typescript-eslint/no-explicit-any
                const label = queryRes.incremental[0].label
                resolves.get(label)?.(data)
              }
              return pump()
            })
          }
        },
      })
    })
  }

  subscribe(notify: () => void) {
    this.subscribers.add(notify)
  }
  unsubscribe(notify: () => void) {
    this.subscribers.delete(notify)
  }
}
