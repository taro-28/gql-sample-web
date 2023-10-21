'use client'
import { useCallback, useMemo, useSyncExternalStore } from 'react'
import { GqlClient } from './GqlClient'

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

  const getCache = useCallback(() => client.cache, [])

  return useSyncExternalStore(subscribe, getCache)
}
