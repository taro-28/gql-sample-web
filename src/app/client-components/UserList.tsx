'use client'
import { useFragment } from '@/packages/gqlClient/client/useFragment'
import clsx from 'clsx'
import gql from 'graphql-tag'
import { Fragment } from 'react'

export const UsersFragment = gql`
  fragment UsersFragment on Query {
    users {
      name
      email
      company {
        name
        branch
      }
    }
  }
`

type Props = Omit<JSX.IntrinsicElements['div'], 'children'>

export const UserList = ({ className, ...props }: Props) => {
  const { data } = useFragment({
    fragment: UsersFragment,
  })

  return (
    <div className={clsx('grid grid-cols-4 gap-2 rounded-md border-2 p-2', className)} {...props}>
      <div className='font-semibold'>氏名</div>
      <div className='font-semibold'>メールアドレス</div>
      <div className='font-semibold'>会社名</div>
      <div className='font-semibold'>支店名</div>
      {// eslint-disable-next-line @typescript-eslint/no-explicit-any
      data?.users.map(({ name, email, company }: any) => (
        <Fragment key={email}>
          <div>{name}</div>
          <div>{email}</div>
          <div>{company.name}</div>
          <div>{company.branch}</div>
        </Fragment>
      ))}
    </div>
  )
}
