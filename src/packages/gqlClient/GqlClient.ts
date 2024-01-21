import {
  DocumentNode,
  FieldNode,
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
  }

  async mutate() {
    return fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation {deletePurchase(userId:"1", id: "11") }
        `,
      }),
    }).then((response) => response.json())
  }

  async query(query: DocumentNode) {
    const resolves = new Map<string, (data: Value) => void>()

    // TODO: 再帰的にフラグメントを探索してCacheにセットする
    query.definitions
      .find(
        (def): def is OperationDefinitionNode =>
          def.kind === 'OperationDefinition' && def.operation === 'query',
      )
      ?.selectionSet.selections.filter((sel): sel is FieldNode => sel.kind === 'Field')
      .flatMap((sel) => sel.selectionSet?.selections)
      .filter((sel): sel is FragmentSpreadNode => sel?.kind === 'FragmentSpread')
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
          function pump(): any {
            return reader?.read().then(({ done, value }) => {
              if (done) {
                controller.close()
                return
              }

              const data = fo

              // uint8arrayを文字列に変換する
              const str = new TextDecoder('utf-8').decode(value)

              try {
                // 文字列形式のHTTPレスポンスをパースする
                const resBody = parser.parseResponse(str).body
                // bodyが2行の文字列で、1行目にJSON、2行目に区切りの---が付いているので1行目を取り出す
                const body = resBody.split('\n')[0]

                const queryRes = JSON.parse(body)
                const data = queryRes.incremental ? queryRes.incremental[0].data : queryRes.data

                // TODO: queryやfragmentのフィールドがpromiseの場合に、cacheの値をセットする
                if (queryRes.incremental) {
                  const label = queryRes.incremental[0].label
                  resolves.get(label)?.(data)
                } else {
                  resolves.get('query')?.(data)
                }
              } catch (e) {
                const data = JSON.parse(str).data

                // TODO: ここでqueryからフラグメントを取り出して、フラグメントのpromiseをresolveする
                if ('purchases' in data.user) {
                  const purchases = data.user.purchases
                  resolves.get('PurchasesFragment')?.({ purchases })
                }
                resolves.get('query')?.(data)
              }

              return pump()
            })
          }
        },
      })
    })

    return queryPromise
  }

  async query(query: DocumentNode) {
    const resolves = new Map<string, (data: Value) => void>()

    const queryDef = query.definitions.find(
      (def): def is OperationDefinitionNode =>
        def.kind === 'OperationDefinition' && def.operation === 'query',
    )

    if (!queryDef) return

    const queryName = queryDef.name?.value
    const queryPromise = new Promise<Value>((resolve) => resolves.set('query', resolve))
    if (queryName) this.setCache(queryName, queryPromise)

    // TODO: 再帰的にフラグメントを探索してCacheにセットする
    queryDef?.selectionSet.selections
      .filter((sel): sel is FieldNode => sel.kind === 'Field')
      .flatMap((sel) => sel.selectionSet?.selections)
      .filter((sel): sel is FragmentSpreadNode => sel?.kind === 'FragmentSpread')
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

              try {
                // 文字列形式のHTTPレスポンスをパースする
                const resBody = parser.parseResponse(str).body
                // bodyが2行の文字列で、1行目にJSON、2行目に区切りの---が付いているので1行目を取り出す
                const body = resBody.split('\n')[0]

                const queryRes = JSON.parse(body)
                const data = queryRes.incremental ? queryRes.incremental[0].data : queryRes.data

                // TODO: queryやfragmentのフィールドがpromiseの場合に、cacheの値をセットする
                if (queryRes.incremental) {
                  //   eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const label = queryRes.incremental[0].label
                  resolves.get(label)?.(data)
                } else {
                  resolves.get('query')?.(data)
                }
              } catch (e) {
                const data = JSON.parse(str).data

                // TODO: ここでqueryからフラグメントを取り出して、フラグメントのpromiseをresolveする
                if ('purchases' in data.user) {
                  const purchases = data.user.purchases
                  resolves.get('PurchasesFragment')?.({ purchases })
                }
                resolves.get('query')?.(data)
              }

              return pump()
            })
          }
        },
      })
    })

    return queryPromise
  }
}
