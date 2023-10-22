import { GqlClient } from '@/packages/gqlClient/GqlClient'
import { useCallback, useMemo, useSyncExternalStore } from 'react'

export const client = new GqlClient({
  url: 'http://localhost:3000/graphql',
})

export const useGqlClient = () => {
  const subscribe = useMemo(() => {
    return (notify: () => void) => {
      client.subscribe(notify)
      return () => {
        client.unsubscribe(notify)
      }
    }
  }, [])

  const getClient = useCallback(() => client, [])
  return useSyncExternalStore(subscribe, getClient, getClient)
}
