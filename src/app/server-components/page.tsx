import { PageTitle } from '@/components/PageTitle'
import { UserList, UsersFragment } from './UserList'
import { Suspense } from 'react'
import { getGqlClient } from './gqlClient'
import gql from 'graphql-tag'
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

export default async function ServerComponents() {
  await getGqlClient().deferQuery(query)
  return (
    <div className='space-y-4'>
      <PageTitle>Server Component</PageTitle>
      <Suspense fallback={<Loading />}>
        <UserList />
      </Suspense>
    </div>
  )
}
