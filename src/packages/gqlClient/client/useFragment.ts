'use client'
import { use, useMemo } from 'react'
import { DocumentNode } from 'graphql'
import { gqlClient } from '../../../app/client-components/gqlClient'

type Props = {
  fragment: DocumentNode
}

type Returns = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

export const useFragment = ({ fragment }: Props): Returns => {
  const fragValue = gqlClient.readFragment(fragment)
  return useMemo(
    () => ({ data: fragValue instanceof Promise ? use(fragValue) : fragValue }),
    [fragValue],
  )
}
