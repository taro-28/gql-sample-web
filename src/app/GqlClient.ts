import { GqlClient } from '@/packages/GqlClient'
import { registerGqlClient } from '@/packages/registerGqlClient'

export const { getClient: getGqlClient } = registerGqlClient(
  () =>
    new GqlClient({
      url: 'http://localhost:3000/graphql',
    }),
)
