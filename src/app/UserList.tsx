'use client'
import { useFragment } from '@/hooks/useFragment'
import clsx from 'clsx'
import { Fragment } from 'react'

type Props = Omit<JSX.IntrinsicElements['div'], 'children'>

export const UserList = ({ className, ...props }: Props) => {
  const { data: users } = useFragment()

  return (
    <div className={clsx('grid grid-cols-4 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>氏名</div>
      <div className='font-semibold'>メールアドレス</div>
      <div className='font-semibold'>会社名</div>
      <div className='font-semibold'>支店名</div>
      {users ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        users.map(({ name, email, company }: any) => (
          <Fragment key={email}>
            <div>{name}</div>
            <div>{email}</div>
            <div>{company.name}</div>
            <div>{company.branch}</div>
          </Fragment>
        ))
      ) : (
        <div className='col-span-4 py-2 text-center text-xl'>loading...</div>
      )}
    </div>
  )
}