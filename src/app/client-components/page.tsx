'use client'
import { PageTitle } from '@/components/PageTitle'
import { UserList, UsersFragment } from './UserList'
import { Suspense, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@/packages/gqlClient/client/useQuery'
import { Loading } from '@/components/Loading'

const query = gql`
  ${UsersFragment}
  {
    ...UsersFragment @defer(label: "UsersFragment")
  }
`

export default function ClientComponent() {
  const [isClient, setIsClient] = useState(false)

  useQuery({ query })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className='space-y-4'>
      <PageTitle>Client Component</PageTitle>
      <Suspense fallback={<Loading />}>
        <UserList />
      </Suspense>
    </div>
  )
}
