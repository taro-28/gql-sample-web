'use client'
import { useFragment } from '@/packages/gqlClient/client/useFragment'
import clsx from 'clsx'
import gql from 'graphql-tag'
import { Fragment } from 'react'

export const PurchasesFragment = gql`
  fragment PurchasesFragment on User {
    purchases {
      date
      amount
      item
    }
  }
`

type Props = Omit<JSX.IntrinsicElements['div'], 'children'>

export const UserList = ({ className, ...props }: Props) => {
  const { data } = useFragment({
    fragment: PurchasesFragment,
  })

  return (
    <div className={clsx('grid grid-cols-3 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>氏名</div>
      <div className='font-semibold'>メールアドレス</div>
      <div className='font-semibold'>支店名</div>
      {data?.purchases ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data?.purchases?.map(({ date, amount, item }: any) => (
          <Fragment key={date}>
            <div>{date}</div>
            <div>{amount}</div>
            <div>{item}</div>
          </Fragment>
        ))
      ) : (
        <div className='col-span-4 py-2 text-center text-xl'>loading...</div>
      )}
    </div>
  )
}
