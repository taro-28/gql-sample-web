'use client'
import { DocumentNode } from 'graphql'
import { cache, use, useMemo } from 'react'
import { gqlClient } from '@/app/client-components/gqlClient'

const cachedQuery = cache((query: DocumentNode) => gqlClient.deferQuery(query))

type Props = {
  query: DocumentNode
}

export const useQuery = ({ query }: Props) => {
  use(cachedQuery(query))
  return useMemo(() => ({ users: undefined }), [])
}
