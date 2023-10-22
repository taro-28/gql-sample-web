'use client'
import { UsersFragment } from '@/app/server-components/UserList'
import { use, useMemo } from 'react'
import { useGqlClient } from './useGqlClient'

type Returns = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const useFragment = (): Returns => {
  const client = useGqlClient()
  const fragValue = client.readFragment(UsersFragment)
  const data = fragValue instanceof Promise ? use(fragValue) : fragValue
  return useMemo(() => ({ data }), [data])
}
