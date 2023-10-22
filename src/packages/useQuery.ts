import { useGqlClient } from './useGqlClient'
import { DocumentNode } from 'graphql'
import { useEffect, useMemo } from 'react'

type Props = {
  query: DocumentNode
}

export const useQuery = ({ query }: Props) => {
  const client = useGqlClient()

  useEffect(() => {
    client.deferQuery(query)
  }, [query, client])

  return useMemo(() => ({ users: undefined }), [])
}
