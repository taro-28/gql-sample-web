import { PageTitle } from '@/components/PageTitle'
import gql from 'graphql-tag'
import { Suspense } from 'react'
import { Loading } from '@/components/Loading'
import { getGqlClient } from '../gqlClient'
import { Purchases, PurchasesFragment } from './Purchases'

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

export default async function PromiseCacheDeferPage() {
  const data = await getGqlClient().query(query)
  return (
    <div className='space-y-4'>
      <PageTitle>Promise Cache with Defer</PageTitle>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold'>ユーザー情報</h2>
        <p className='text-gray-500'>
          {data?.user?.name} - {data?.user?.email}
        </p>
      </div>
      <h2 className='text-lg font-bold'>Purchases</h2>
      <Suspense fallback={<Loading />}>
        <Purchases />
      </Suspense>
    </div>
  )
}
