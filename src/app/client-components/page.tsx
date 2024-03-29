'use client'
import { PageTitle } from '@/components/PageTitle'
import { UserList, PurchasesFragment } from './UserList'
import { Suspense, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@/packages/gqlClient/client/useQuery'
import { Loading } from '@/components/Loading'

const query = gql`
  ${PurchasesFragment}
  {
    user(id: "1") {
      name
      email
      ...PurchasesFragment @defer(label: "PurchasesFragment")
    }
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
        <h2 className='text-xl font-bold'>User</h2>
        <p className='text-gray-500'>
          {data?.user?.name} - {data?.user?.email}
        </p>
      </div>
      <Suspense fallback={<Loading />}>
        <UserList />
      </Suspense>
    </div>
  )
}
