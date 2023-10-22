import { GqlClient } from '@/packages/gqlClient/GqlClient'

export const gqlClient = new GqlClient({
  url: 'http://localhost:3000/graphql',
})
