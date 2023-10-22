import { cache } from 'react'
import { GqlClient } from '../GqlClient'

//github.com/apollographql/apollo-client-nextjs/blob/main/package/src/rsc/registerApolloClient.tsx
export const registerGqlClient = (makeClient: () => GqlClient) => {
  // cacheを使うとリクエストスコープになる
  // 内部でAsyncLocalStorageを使っている
  // https://react.dev/reference/react/cache
  const getClient = cache(makeClient)
  return { getClient }
}
