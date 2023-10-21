'use client'
import { PageTitle } from '@/components/PageTitle'
import { UserList } from './UserList'
import { useQuery } from '@/packages/useDeferQuery'
import { Card } from '@/components/Card'
import { Suspense } from 'react'

const query = `{
  ... on Query @defer(label : "tasks") {
    tasks {
      id
    }
  }
  ... on Query @defer(label: "companies") {
    companies {
      name
    }
  }
  ... on Query @defer(label: "users") {
    users {
      name
      email
      company {
        name
        branch
      }
    }
  } 
}`

export default function Home() {
  const data = useQuery({ query })
  return (
    <div className='w-full space-y-4'>
      <PageTitle>DashBoard</PageTitle>
      {data?.tasks?.[0] && (
        <div className='rounded-md bg-yellow-50 px-4 py-2 font-semibold'>
          未対応のタスクが{data.tasks.length}件あります
        </div>
      )}
      <div className='grid grid-cols-3 justify-between gap-4'>
        <Card content='100,000,000円' title='売上' />
        <Card content={data?.companies?.length ?? 'loading...'} title='企業数' />
        <Card content={data?.users?.length ?? 'loading...'} title='ユーザー数' />
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <div className='text-xl'>顧客一覧</div>
          <button
            className='hover: rounded-md border-none bg-indigo-400 px-6 py-2 font-semibold text-slate-50 hover:bg-indigo-300 hover:text-slate-50'
            type='button'
          >
            追加
          </button>
        </div>
        <Suspense fallback={<div>loading... by Suspense</div>}>
          <UserList />
        </Suspense>
      </div>
    </div>
  )
}
