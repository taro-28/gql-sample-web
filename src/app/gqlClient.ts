import { GqlClient } from '@/packages/gqlClient/GqlClient'
import { registerGqlClient } from '@/packages/gqlClient/server/registerGqlClient'

export const { getClient: getGqlClient } = registerGqlClient(
  () =>
    new GqlClient({
      url: 'http://localhost:3000/graphql',
      cachePolicy: 'no-store',
    }),
)
