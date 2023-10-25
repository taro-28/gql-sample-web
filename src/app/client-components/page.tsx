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
    company(id: "c1") {
      name
      branch
    }
    ...UsersFragment @defer(label: "UsersFragment")
  }
`

export default function ClientComponent() {
  const [isClient, setIsClient] = useState(false)

  const data = useQuery({ query })

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <div className='space-y-4'>
      <PageTitle>Client Component</PageTitle>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold'>Company</h2>
        <p className='text-gray-500'>
          {data?.company?.name} - {data?.company?.branch}
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <UserList />
      </Suspense>
    </div>
  )
}
