'use client'
import { use, useMemo } from 'react'
import { useGqlClient } from './useGqlClient'
import { DocumentNode } from 'graphql'

type Props = {
  fragment: DocumentNode
}

type Returns = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const useFragment = ({ fragment }: Props): Returns => {
  const client = useGqlClient()
  const fragValue = client.readFragment(fragment)
  return useMemo(
    () => ({ data: fragValue instanceof Promise ? use(fragValue) : fragValue }),
    [fragValue],
  )
}
